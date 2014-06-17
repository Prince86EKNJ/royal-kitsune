var chai = require("chai");
var expect = chai.expect;

var dbData = require("./data/test-db.json");
var db = require("../lib/db").buildFromData(dbData);

var foxShell = require("../lib/fox-shell")(db);

describe("fox-shell", function()
{
	describe("executeMacro(cmd, context)", function()
	{
		it("executes macros against the database", function()
		{
			var result = foxShell.executeMacro("@name");

			expect(result[0].id).to.equal(db.tableIds.name);
		});
	});
});
