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

	var processFoxInjection = function(cmd)
	{
		var parts = cmd.split("#");

		var result = "";
		_.each(parts, function(part, i)
		{
			if(i % 2 == 0)
			{
				result += part;
			}
			else
			{
				result += foxShell.eval(part);
			}
		});

		return result;
	};

	foxRepl.eval = function(cmd, context, filename, callback)
	{
		var err;
		var result;

		try
		{
			if(isCommand(cmd))
			{
				//Remove token and trailing newline
				cmd = cmd.trim().substring(1, cmd.length-1);
				result = foxShell.eval(cmd, context);
			}
			else
			{
				var processedCmd = processFoxInjection(cmd);
				console.log(context);
				result = vm.runInContext(processedCmd, context, filename);
				console.log("!"+result);
			}
		}
		catch(e)
		{
			err = e;
		}

		console.log(result);
		if(callback != null)
		{
			callback(err, result);
		}
	};

	foxRepl.start = function(options)
	{
		// Set options to empty object if undefined
		options = options || {};
		var finalOptions = _.defaults(options, { eval: foxRepl.eval });

		var initOut = options.output || process.stdout;
		initOut.write("=== Royal Kitsune ===\n");

		var replSession = repl.start(finalOptions);
		var replOut = replSession.outputStream;

		replSession.on("exit", function()
		{
			replOut.write("\n");
			replOut.write("=== END OF LINE ===\n");
		});

		var context = replSession.context;
		context.replSession = replSession;
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
