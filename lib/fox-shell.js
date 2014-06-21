var _ = require("./royal-lodash");

module.exports = function(db)
{
	var foxShell = {};

	foxShell.eval = function(cmd, context)
	{
		var result = null;

		var entities = db.getEntitiesByName(cmd);

		if(entities.length > 0)
		{
			result = entities[0].id;
		}

		// Populate "r"
		if(context != undefined)
		{
			if(context.r == undefined)
			{
				context.r = {};
			}

			context.r.named = entities;
			context.r.first = entities[0];
			if(entities[0] != undefined)
			{
				context.r.id = context.r.first.id;
			}
			context.r.ids = _.pluck(entities, "id");
			context.r.last = entities[entities.length-1];
		}

		return result;
	};

	return foxShell;
};
