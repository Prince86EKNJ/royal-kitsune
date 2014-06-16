var repl = require("repl");
var vm = require("vm");

var _ = require("./lib/royal-lodash");
var taffy = require("taffydb").taffy;
var db = require("./lib/db")("./data/db.json");
var foxShell = require("./lib/fox-shell")();

// Assemble exports
var exports =
{
	db: db,
	t: db.tables,
	lodash: _,
	taffy: taffy
};

// Setup and Run REPL
var evalFunc = function(cmd, context, filename, callback)
{
	var err;
	var result;

	try
	{
		if(foxShell.hasMacro(cmd))
		{
			result = foxShell.executeMacro(cmd, context);
		}
		else
		{
			result = vm.runInContext(cmd, context, filename);
		}
	}
	catch(e)
	{
		err = e;
	}

	callback(err, result);
};

console.log("=== Royal Kitsune ===");
var replSession = repl.start(
{
	eval: evalFunc
});

replSession.on("exit", function()
{
	console.log("");
	console.log("=== END OF LINE ===");
});

var context = replSession.context;
context.exports = exports;

// Attach the exports to the REPL context
_.each(exports, function(value, key)
{
	context[key] = value;
});

// Add "result" variable to context to hold macro responses
context.r = {};
