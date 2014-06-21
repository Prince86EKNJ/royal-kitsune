var chai = require("chai");
var expect = chai.expect;

var vm = require("vm");
var stream = require("stream");
var StringDecoder = require("string_decoder").StringDecoder;

var dbData = require("./data/test-db.json");
var db = require("../lib/db").buildFromData(dbData);

var foxShell = require("../lib/fox-shell")(db);
var foxRepl = require("../lib/fox-repl")(foxShell, { msg: "Hello" });

describe("fox-repl", function()
{
	var evalResult;
	var callback = function(err, result)
	{
		if(err != null)
		{
			throw err;
		}

		evalResult = result;
	};

	before(function()
	{
		evalResult = null;
	});

	describe("eval(cmd, context, filename, callback)", function()
	{
		it("hands commands to the fox shell and default repl", function()
		{
			var context = vm.createContext();

			foxRepl.eval("(7 + 13)", context, null, callback);
			expect(evalResult).to.equal(20);

			foxRepl.eval("#name", context, null, callback);
			expect(evalResult.length).to.equal(1);
			expect(evalResult[0].id).to.equal(db.tableIds.name);
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
