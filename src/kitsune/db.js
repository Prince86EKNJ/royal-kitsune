define(["royal-lodash", "taffy"], function(_, taffy)
{
	// Create / Load each table

	var tables = {};

	var db = {
		entityTypeId: "9099e7904c6325ef6aed42e59bba77d6abd745b8",
		tables: tables,
		systemTables: {}
	};

	var tableIds = {
		entity: "533de46c353ad84bb72fcaa7de0d310a4af36524",
		entityMap: "960981be07d81e4146d04dc7e80038f91fb51d7b",
		name: "7d070ad0991ce6d0167b1c6dc1d4ab8934a4a22c"
	};

	db.tableIds = tableIds;

	_.each(tableIds, function(tableId, tableName)
	{
		var newTableId = "T_"+tableId;

		var table = taffy([]);
		table.store(newTableId);

		tables[newTableId] = table; 

		db.systemTables[tableName] = table;
	});

	// DB Functions
	db.getNextId = function(table)
	{
		var id = table().max("id") + 1;
		id = id == null ? 1 : id;

		return id;
	};

	db.insertWithNextId = function(table, data)
	{
		var nextId = db.getNextId(table);
		data.id = nextId;
		table.insert(data);

		return data;
	};

	db.lookupSystemTableId = function(tableName)
	{
		return tableIds[tableName];
	}

	db.getTable = function(tableId)
	{
		return tables["T_"+tableId];
	};

	db.insertWithNextIdB = function(tableId, data)
	{
		var table = db.getTable(tableId);

		var nextId = db.getNextId(table);
		data.id = nextId;
		table.insert(data);

		return data;
	};

	db.insertEntity = function(typeId)
	{
		var hash = _.buildHash(20);

		var entityTableId = db.lookupSystemTableId("entity");
		var entityTable = db.getTable(entityTableId);

		var data = { id: hash, type: typeId };
		entityTable.insert(data);

		return data;
	};

	db.insertEntityType = function()
	{
		return db.insertEntity(entityTypeId);
	};

	db.insertEntityWithData = function(table, data)
	{
		var entity = db.insertEntity();
		data.entityId = entity.hash;
		var result = db.insertWithNextId(table, data);
		// FIXME: "type" on "entity" shouldn't be null
		db.tables.entity({ hash: data.hash }).update({ type: null });
		return result;
	};

	db.insertEntityWithDataB = function(tableId, data)
	{
		var entity = db.insertEntity();
		data.entityId = entity.hash;
		var result = db.insertWithNextIdB(tableId, data);
		db.tables.entity({ hash: data.hash }).update({ type: tableId });
		return result;
	};

	// DB Helper Functions
	db.removeAll = function(password)
	{
		if(password != "removeMe")
		{
			return false;
		}

		_.each(tableIds, function(tableId)
		{
			tables[tableId]().remove();
		});

		return true;
	};

	return db;
});
