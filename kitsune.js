var taffyObj = require("lib/taffy");
var taffy = taffyObj.taffy;

console.log("=== Royal Kitsune ===");

var names = taffy([{ name: "fox" }, { name: "hound" }]);
console.log(names().get());

var copy = function(from, to)
{
	for( i in from )
	{
		var value = from[i];
		to[i] = value;
	}
};

var repl = require("repl");
var context = repl.start("> ").context;
context.taffy = taffy;
context.names = names;
