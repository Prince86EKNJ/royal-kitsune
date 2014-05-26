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

require(["kitsune"], function(kitsune)
{
	kitsune();
});
