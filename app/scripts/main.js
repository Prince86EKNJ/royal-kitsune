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

require(["kitsune/kitsune"], function(kitsune)
{
	kitsune();
});
