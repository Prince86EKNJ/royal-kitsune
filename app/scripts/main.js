require.config(
{
	baseUrl: "kitsune",

	shim:
	{
		'taffy':
		{
			exports: 'TAFFY'
		}
	}
});

require(["lodash-mixins", "kitsune"], function(_, kitsune)
{
	kitsune();
});
