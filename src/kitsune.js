(function()
{
	var kitsuneFunc = function(_, db)
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

			_.each(exports, function(value, key)
			{
				window[key] = value;
			});
		};

		return kitsune;
	};

	// requireJS
	define(["lodash", "db"], kitsuneFunc);
}());
