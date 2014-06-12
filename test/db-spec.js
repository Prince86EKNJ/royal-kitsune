var chai = require("chai");
var expect = chai.expect;

var storage = require("dom-storage");
global.localStorage = new storage("./test-db.json", { strict: false, ws: "  " });

var db = require("../lib/db")();

describe("db", function()
{
	describe("getTable(tableId)", function()
	{
		it("gets a table by id", function()
		{
			var nameTableId = db.tableIds.name;
			var nameTable = db.getTable(nameTableId);
			expect(nameTable).to.not.be.undefined;
		});
	});
});
