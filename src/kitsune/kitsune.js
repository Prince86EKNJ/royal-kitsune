define(["royal-lodash", "kitsune/db"], function(_, db)
{
	var kitsune = function()
	{
		console.log("=== Royal Kitsune ===");
		console.log("=== END OF LINE ===");

		var exports =
		{
			db: db,
			T: db.tables,
			lodash: _
		};

		return exports;
	};

	return kitsune;
});