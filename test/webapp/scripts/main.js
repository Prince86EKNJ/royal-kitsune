require.config(
{
	paths:
	{
		"spec": "../specs"
	},
	shim:
	{
		'taffy':
		{
			exports: 'TAFFY'
		}
	}
});

// Run specs
require(["spec/kitsune-spec"], function()
{
	runJasmine();
});
