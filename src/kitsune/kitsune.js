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

		// TODO: Make this configuratble for NodeJS and Browsers
		_.each(exports, function(value, key)
		{
			window[key] = value;
		});
	};

	return kitsune;
});
