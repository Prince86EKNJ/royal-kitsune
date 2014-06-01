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
};

var replSession = repl.start(
{
	eval: evalFunc
});
replSession.context.requirejs = requirejs;

// Attach the exports to the REPL context
var _  = requirejs("royal-lodash");
_.each(exports, function(value, key)
{
	replSession.context[key] = value;
});
