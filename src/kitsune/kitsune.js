define(["royal-lodash", "kitsune/db"], function(_, db)
{
	var kitsune = function()
	{
		console.log("=== Royal Kitsune ===");

		var F = {};

		console.log("=== END OF LINE ===");

		var exports =
		{
			db: db,
			F: F
		};

		return exports;
	};

	return kitsune;
});
