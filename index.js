var storage = require('dom-storage');
global.localStorage = new storage('./data/db.json', { strict: false, ws: '  ' });

var repl = require("repl");
var vm = require("vm");

var _ = require("./lib/royal-lodash");

var taffy = require("taffydb");

var dbModule = require("./lib/kitsune/db");
var db = dbModule(_, taffy.taffy);

// Load and Run Kitsune
var kitsuneModule = require("./lib/kitsune/kitsune");
var kitsune = kitsuneModule(_, db);
var exports = kitsune();

var hasMacro = function(cmd)
{
	return _.indexOf(cmd.trim(), "@") == 0;
};

var executeMacro = function(cmd, context, filename)
{
	var entities = context.db.getEntitiesByName(cmd);

	// Populate "r"
	context.r.named = entities;
	context.r.first = entities[0];
	context.r.id = context.r.first.id;
	context.r.ids = _.pluck(entities, "id");
	context.r.last = entities[entities.length-1];

	return entities;
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
var context = replSession.context;
context.exports = exports;

// Attach the exports to the REPL context
_.each(exports, function(value, key)
{
	context[key] = value;
});

// Add "result" variable to context to hold macro responses
context.r = {};
