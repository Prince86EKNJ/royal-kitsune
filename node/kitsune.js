var requirejs = require("requirejs");

var repl = require("repl");
var vm = require("vm");

//var requirejs = require("requirejs");

var replSession = repl.start(
{
	eval: function(cmd, context, filename, callback)
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
});
replSession.context.requirejs = requirejs;
