var _ = require("lodash");

module.exports = function(db)
{
	var foxShell = {};

	// Move this to fox-repl
	foxShell.hasMacro = function(cmd)
	{
		return _.indexOf(cmd.trim(), "@") == 0;
	};

	foxShell.executeMacro = function(cmd, context)
	{
		var cleanCmd = cmd.substring(1, cmd.length-1);

		var entities = db.getEntitiesByName(cleanCmd);

		// Populate "r"
		if(context != undefined)
		{
			context.r.named = entities;
			context.r.first = entities[0];
			context.r.id = context.r.first.id;
			context.r.ids = _.pluck(entities, "id");
			context.r.last = entities[entities.length-1];
		}

		return entities;
	};

	return foxShell;
};
