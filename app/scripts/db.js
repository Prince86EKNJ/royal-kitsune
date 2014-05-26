(function()
{
	var dbFunc = function(taffy)
	{
		var tableNames = ["entity", "entityMap", "name", "func"];

		// Create / Load each table
		var db = {};
		_.each(tableNames, function(tableName)
		{
			db[tableName] = TAFFY([]);
			db[tableName].store(tableName);
		});

		db.removeAll = function()
		{
			_.each(tableNames, function(tableName)
			{
				db[tableName]().remove();
			});
		};

		return db;
	};

	// requireJS
	define(["taffy"], dbFunc);
}());
