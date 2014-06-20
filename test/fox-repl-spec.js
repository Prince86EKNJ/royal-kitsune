var chai = require("chai");
var expect = chai.expect;

var stream = require("stream");
var StringDecoder = require("string_decoder").StringDecoder;

var foxRepl = require("../lib/fox-repl")(null, { msg: "Hello" });

describe("fox-repl", function()
{
	describe("eval(cmd, context, filename, callback)", function()
	{
		it("hands commands to the fox shell and default repl", function()
		{
			throw "fail";
		});
	});

	describe("start()", function()
	{
		it("starts the fox shell", function()
		{
			var data = "";
			var outStream = new stream.Writable();
			outStream._write = function(chunk)
			{
				var decoder = new StringDecoder("utf8");
				data += decoder.write(chunk);
				return true;
			};

			var replSession = foxRepl.start({
				input: process.stdin,
				output: outStream,
				terminal: true
			});
			replSession.rli.close();

			expect(replSession).to.not.be.undefined;
		});
	});
});
