var chai = require("chai");
var expect = chai.expect;

//var storage = require("dom-storage");
//global.localStorage = new storage("./test/test-db.json", { strict: false, ws: "  " });

var db = require("../lib/db")();

describe("db", function()
{
	var nameTableId = db.tableIds.name;
	var nameTable = db.getTable(nameTableId);

	describe("getTable(tableId)", function()
	{
		it("gets a table by id", function()
		{
			var nameTable = db.getTable(nameTableId);
			expect(nameTable).to.not.be.undefined;
		});
	});

	describe("insert(tableId, data)", function()
	{
		it("inserts data into the table specified by "+
			"tableId and returns data", function()
		{
			db.insert(nameTableId, { name: "Jeff" });
			var recordCount = nameTable({ name: "Jeff" }).count();
			expect(recordCount).to.equal(1);
		});
	});
});
