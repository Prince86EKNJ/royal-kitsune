var _ = require("lodash");
var royalLodash = require("../src/royal-lodash");

_ = royalLodash(_);

var chai = require("chai");
var expect = chai.expect;

describe("royal-lodash", function()
{
	describe("getRandomHexChar()", function()
	{
		it("returns a random hex char", function()
		{
			var randomChar = _.getRandomHexChar();
			expect(randomChar).to.match(/[0-9a-f]/);
		});
	});

	describe("buildHash(size)", function()
	{
		it("builds a random has string that represents \"size\" bytes", function()
		{
			var hashStr = _.buildHash(16);
			expect(hashStr).to.match(/[0-9a-f]{32}/);
		});
	});
});
