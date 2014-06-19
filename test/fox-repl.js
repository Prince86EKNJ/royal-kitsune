var chai = require("chai");
var expect = chai.expect;

var foxRepl = require("../lib/fox-repl")();

describe("fox-repl", function()
{
	describe("start()", function()
	{
		it("starts the fox shell", function()
		{
			var stream = require("stream");
			var outStream = new stream.Stream();
			outStream.writeable = true;
			outStream.write = function() { /* NOP */ };
			outStream.end = function() { /* NOP */ };

			var replSession = foxRepl.start({
				output: outStream
			});

			expect(replSession).to.not.be.undefined;
		});
	});
});
