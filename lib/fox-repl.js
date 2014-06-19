var _ = require("./royal-lodash");
var vm = require("vm");
var repl = require("repl");

module.exports = function(foxShell, exports)
{
	var foxRepl = {};

	// Move this to fox-repl
	var isCommand = function(cmd)
	{
		return _.indexOf(cmd.trim(), ":") == 0;
	};

	var evalFunc = function(cmd, context, filename, callback)
	{
		var err;
		var result;

		try
		{
			if(isCommand(cmd))
			{
				//Remove trailing newline
				cmd = cmd.substring(0, cmd.length-1);
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

	foxRepl.start = function(options)
	{
		console.log("=== Royal Kitsune ===");

		// Set options to empty object if undefined
		options = options || {};
		var finalOptions = _.defaults(options, { eval: evalFunc });
		var replSession = repl.start(finalOptions);

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

		return replSession;
	};

	return foxRepl;
};
