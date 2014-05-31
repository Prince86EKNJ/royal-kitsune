var requirejs = require("requirejs");
requirejs.config({
	baseUrl: "scripts"
});

var repl = require("repl");
var vm = require("vm");

// Load and Run Kitsune
var kitsune = requirejs("kitsune/kitsune");
kitsune();

// Setup and Run REPL
var evalFunc = function(cmd, context, filename, callback)
{
	var err;
	var result;

	try
	{
		result = vm.runInContext(cmd, context, filename);
	}
	catch(e)
	{
		err = e;
	}

	callback(err, result);
}

var replSession = repl.start(
{
	eval: evalFunc
});
replSession.context.requirejs = requirejs;
