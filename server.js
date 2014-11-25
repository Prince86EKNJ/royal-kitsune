var fs = require("fs");

var _ = require("lodash");
var Gaze = require("gaze").Gaze;
var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;

var getProjectPath = function(args)
{
	var varIndex = 1;
	if(args[0] == "node")
		varIndex++;

	var projectPath = args[varIndex];
	if(projectPath == null)
	{
		console.error("Please specify a project path");
		process.exit(1);
	}
	return projectPath;
};

// Set up watcher
var projectPath = getProjectPath(process.argv);
console.log("Project Path: "+projectPath);

var clients = [];
var sendToAll = function(msg)
{
	clients = _.map(clients, function(client)
	{
		if(client == null || client.readyState != WebSocket.OPEN)
			return null;

		client.send(msg);
		return client;
	});
};

var gaze = new Gaze(projectPath+"/**/*.js");
gaze.on("all", function(event, filename)
{
	console.log(filename);
	var fileData = fs.readFileSync(filename, "utf8");
	sendToAll(fileData);
});

// Setup socket server
var wss = new WebSocketServer({ port: 8081 });
wss.on("connection", function(ws)
{
	ws.on("message", function(msg)
	{
		console.log(msg);
	});

	console.log("Client connected");
	clients.push(ws);
});
