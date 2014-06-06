var chai = require("chai");
var expect = chai.expect;

// dummy test
var kitsune = function() {};

describe("kitsune/kitsune", function()
{
	it("is a function", function()
	{
		expect(typeof kitsune).to.equal("function");
	});
});
