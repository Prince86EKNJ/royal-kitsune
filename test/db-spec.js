var chai = require("chai");
var expect = chai.expect;

var dbData = require("./data/test-db.json");

describe("db", function()
{
	var db;

	var entityTableId;
	var entityTable;

	var entityMapTableId;
	var entityMapTable;

	var nameTableId;
	var nameTable;

	before(function()
	{
		db = require("../lib/db").buildFromData(dbData);

		entityTableId = db.tableIds.entity;
		entityTable = db.getTable(entityTableId);

		entityMapTableId = db.tableIds.entityMap;
		entityMapTable = db.getTable(entityMapTableId);

		nameTableId = db.tableIds.name;
		nameTable = db.getTable(nameTableId);
	});

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
			db.insert(nameTableId, { name: "james" });

			var recordCount = nameTable({ name: "james" }).count();
			expect(recordCount).to.equal(1);
		});
	});

	describe("insertEntity(typeId)", function()
	{
		it("creates a new record in the entity table with a given " +
			"type and returns it", function()
		{
			var entity = db.insertEntity(nameTableId);
			var recordCount = entityTable({ id: entity.id, type: entity.type }).count();

			expect(entity.id).to.match(/[a-f0-9]{40}/);
			expect(entity.type).to.equal(nameTableId);
			expect(recordCount).to.equal(1);
		});
	});

	describe("insertEntityWithData(tableId, data)", function()
	{
		it("creates an entity for the coresponding data and " +
			"inserts data into table with entity id",
			function()
		{
			var data = db.insertEntityWithData(nameTableId, { name: "rose" });

			expect(entityTable({ id: data.id }).count()).to.equal(1);
			expect(nameTable({ id: data.id, name: "rose" }).count()).to.equal(1);
		});
	});

	describe("getOrInsertName(name)", function()
	{
		it("returns the entity for the given name if it exists", function()
		{
			var nameA = db.insertEntityWithData(nameTableId, { name: "hilde" });
			var nameB = db.getOrInsertName("hilde");

			expect(nameA.id).to.equal(nameB.id);
		});

		it("creates a new name if it doesn't exists", function()
		{
			var nameResults = nameTable({ name: "hans" }).get();
			var newName = db.getOrInsertName("hans");

			expect(nameResults.length).to.equal(0);
			expect(newName.name).to.equal("hans");
		});
	});

	describe("mapEntities(head, tail)", function()
	{
		it("creates a relationship from the head entity to the tail", function()
		{
			var mapping = db.mapEntities(entityTableId, nameTableId);

			expect(entityMapTable({
				id: mapping.id,
				head: mapping.head,
				tail: mapping.tail
			}).count()).to.equal(1);
			expect(entityTable({ id: mapping.id }).count()).to.equal(1);
		});
	});

	describe("getEntitiesByName(name)", function()
	{
		it("returns all entities that have a mapping to the given name", function()
		{
			var entities = db.getEntitiesByName("entity");

			expect(entities.length).to.equal(1);
			expect(entities[0]).to.have.property("id", entityTableId);
		});
	});

	describe("removeAll(password)", function()
	{
		it("removes all data from all tables when given the proper password", function()
		{
			db.removeAll("removeMe");

			expect(entityTable().count()).to.equal(0);
			expect(entityMapTable().count()).to.equal(0);
			expect(nameTable().count()).to.equal(0);
		});

		it("throws an exception when the wrong password is given", function()
		{
			expect(function()
			{
				db.removeAll("wrongPassword");
			}).to.throw("Incorrect password, please try again...");
		});
	});
});
