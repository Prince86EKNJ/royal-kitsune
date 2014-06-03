var storage = require('dom-storage');
global.localStorage = new storage('./db.json', { strict: false, ws: '  ' });

var requirejs = require("requirejs");
requirejs.config({
	baseUrl: "scripts"
});

var repl = require("repl");
var vm = require("vm");

// Load and Run Kitsune
var kitsune = requirejs("kitsune/kitsune");
var exports = kitsune();

var _  = requirejs("royal-lodash");
var hasMacro = function(cmd)
{
	return _.indexOf(cmd.trim(), "@") == 0;
};

var executeMacro = function(cmd, context, filename)
{
	return context.db.getEntitiesByName(cmd);
};

// Setup and Run REPL
var evalFunc = function(cmd, context, filename, callback)
{
	var err;
	var result;

	try
	{
		if(hasMacro(cmd))
		{
			var cleanCmd = cmd.substring(1, cmd.length-1);
			result = executeMacro(cleanCmd, context, filename);
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

var replSession = repl.start(
{
	eval: evalFunc
});
replSession.context.requirejs = requirejs;

// Attach the exports to the REPL context
_.each(exports, function(value, key)
{
	replSession.context[key] = value;
});
