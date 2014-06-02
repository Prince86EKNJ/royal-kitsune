define(["royal-lodash", "taffy"], function(_, taffy)
{
	var tableIds = {
		entity: "",
		entityMap: "",
		name: "",
		func: ""
	};

	// Create / Load each table

	var tables = {};

	var db = {
		tables: tables
	};

	_.each(tableIds, function(tableId, tableName)
	{
		tables[tableName] = taffy([]);
		tables[tableName].store(tableName);
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

	db.getTableById = function(tableId)
	{
		return tables[tableId];
	};

	db.insertWithNextIdB = function(tableId, data)
	{
		var table = db.getTableById(tableId);

		var nextId = db.getNextId(table);
		data.id = nextId;
		table.insert(data);

		return data;
	};

	db.insertEntity = function()
	{
		var hash = _.buildHash(20);
		var data = db.insertWithNextId(tables.entity, { hash: hash });

		return data;
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
