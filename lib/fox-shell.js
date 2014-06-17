var _ = require("./royal-lodash");

module.exports = function(db)
{
	var foxShell = {};

	foxShell.executeMacro = function(cmd, context)
	{
		var name = cmd.substring(1, cmd.length);

		var entities = db.getEntitiesByName(name);

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
