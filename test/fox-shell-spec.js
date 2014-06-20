var chai = require("chai");
var expect = chai.expect;

var dbData = require("./data/test-db.json");
var db = require("../lib/db").buildFromData(dbData);

var foxShell = require("../lib/fox-shell")(db);

describe("fox-shell", function()
{
	describe("eval(cmd, context)", function()
	{
		it("executes macros against the database", function()
		{
			var context = {};

			var result = foxShell.eval("name", context);
			expect(result[0].id).to.equal(db.tableIds.name);

			result = foxShell.eval("missing", context);
			expect(result.length).to.equal(0);
		});
	});
});
