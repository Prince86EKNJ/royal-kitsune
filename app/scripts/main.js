require.config(
{
	shim:
	{
		'taffy':
		{
			exports: 'TAFFY'
		}
	}
});

require(["kitsune/kitsune", "royal-lodash"], function(kitsune, _)
{
	var exports = kitsune();

	// Attach exports to global scope (window)
	_.each(exports, function(value, key)
	{
		window[key] = value;
	});
});
