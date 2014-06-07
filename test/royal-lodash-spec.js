var _ = require("lodash");
var royal-lodash = require("royal-lodash");

_ = royal-lodash.applyMixins(_);

var chai = require("chai");
var expect = chai.expect;

define("royal-lodash", function()
{
	define("getRandomHexChar()", function()
	{
		it("returns a random hex char", function()
		{
			var randomChar = _.getRandomHexChar();
			expect(randomChar).to.match(/[0-9a-f]/);
		});
	});
});
