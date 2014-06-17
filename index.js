var _ = require("./lib/royal-lodash");
var taffy = require("taffydb").taffy;
var db = require("./lib/db")("./data/db.json");
var foxShell = require("./lib/fox-shell")(db);

// Assemble exports
var exports =
{
	db: db,
	t: db.tables,
	foxShell: foxShell,
	lodash: _,
	taffy: taffy
};

var foxRepl = require("./lib/fox-repl")(foxShell, exports);

// Setup and Run REPL
foxRepl.start();
