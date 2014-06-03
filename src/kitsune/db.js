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
	db.getTable = function(tableId)
	{
		return tables["T_"+tableId];
	};

	db.insertWithNextId = function(tableId, data)
	{
		var table = db.getTable(tableId);

		var nextId = db.getNextId(table);
		data.id = nextId;
		table.insert(data);

		return data;
	};

	db.insert = function(tableId, data)
	{
		var table = db.getTable(tableId);
		table.insert(data);
		return data;
	};

	db.insertEntity = function(typeId)
	{
		var hash = _.buildHash(20);

		var entityTable = db.getTable(tableIds.entity);

		var data = { id: hash, type: typeId };
		entityTable.insert(data);

		return data;
	};

	db.insertEntityWithData = function(tableId, data)
	{
		var entity = db.insertEntity(tableId);
		data.id = entity.id;
		var result = db.insert(tableId, data);
		return result;
	};

	db.getOrInsertName = function(name)
	{
		var nameTable = db.getTable(tableIds.name);
		var result = nameTable({ name: name }).first();
		if(!result)
		{
			result = db.insertEntityWithData(tableIds.name, { name: name });
		}

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
