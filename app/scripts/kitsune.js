console.log("Royal Kitsune");

require.config({
	paths:
	{
		taffy: "lib/taffy"
	},

	shim:
	{
		taffy:
		{
			exports: "TAFFY"
		}
	}
});

require(["taffy"], function(taffy){
	var names = taffy([{ name: "fox" }, { name: "hound" }]);
	console.log(names().get());
});
