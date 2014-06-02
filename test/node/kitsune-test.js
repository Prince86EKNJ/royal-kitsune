console.log("Running kitsune tests...");

var storage = require('dom-storage');
global.localStorage = new storage('./db.json', { strict: false, ws: '  ' });

var requirejs = require("requirejs");
requirejs.config({
	baseUrl: "scripts",
	paths:
	{
		specs: "../specs"
	}
});

console.log("Done!");
