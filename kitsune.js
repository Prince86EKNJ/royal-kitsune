var _ = require("lib/lodash");
var taffyObj = require("lib/taffy");
var taffy = taffyObj.taffy;
var scratch = require("scratch");

console.log("=== Royal Kitsune ===");

var T = {};

T.entity = taffy([]);
T.func = taffy([]);
T.name = taffy([]);

var F = {};

F.createEntity = function()
{
	var hash = F.buildHash(20);
	var id = F.insertWithNextId(T.entity, { hash: hash });
	return id;
};

F.buildHash = function(size)
{
	var hash = "";

	for(var i=0; i<size*2; i++)
	{
		hash += F.getRandomHexChar();
	}

	return hash;
};

F.getRandomHexChar = function()
{
	var charCode = Math.floor(Math.random() * 16);
	charCode += charCode > 9 ? 87 : 48;
	var hexChar = String.fromCharCode(charCode);
	return hexChar;
};

F.addFunc = function()
{
	func.insert();
};

F.getNextId = function(table)
{
	var id = table().max("id") + 1;
	id = id == null ? 1 : id;
	return id;
};

F.insertWithNextId = function(table, data)
{
	var nextId = F.getNextId(table);
	data["id"] = nextId;
	table.insert(data);
	return nextId;
};

F.renderInJavaScript = function(funcs)
{
	_.each(funcs, function(func)
	{
		console.log(func);
	});
}

var onReplSessionEnd = function()
{
	console.log("=== END OF LINE ===");
};

scratch(T, F);

// Start REPL if run with "-r" option
var replOption = process.argv[2];
var startRepl = replOption != undefined && replOption == "-r";

if(startRepl)
{
	var repl = require("repl");
	var replSession = repl.start("> ");
	replSession.on("exit", onReplSessionEnd);
	var context = replSession.context;
	context.T = T;
	context.F = F;
}
