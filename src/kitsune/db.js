define(["royal-lodash", "taffy"], function(_, taffy)
{
	var tableNames = ["entity", "entityMap", "name", "func"];

	// Create / Load each table
	var db = {};
	_.each(tableNames, function(tableName)
	{
		db[tableName] = taffy([]);
		// FIXME: Not compatiable with NodeJS
		db[tableName].store(tableName);
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

	db.insertEntity = function()
	{
		var hash = _.buildHash(20);
		var data = db.insertWithNextId(db.entity, { hash: hash });

		return data;
	};

	// DB Helper Functions
	db.removeAll = function(password)
	{
		if(password != "removeMe")
		{
			return false;
		}

		_.each(tableNames, function(tableName)
		{
			db[tableName]().remove();
		});

		return true;
	};

	return db;
});
