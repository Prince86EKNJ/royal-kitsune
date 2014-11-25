console.log("Hello Kitsune");

var connect = null;
var setEventHandlers = function(webSocket)
{
	webSocket.onopen = function()
	{
		console.log("Connected to Kitsune server");
	};
	webSocket.onclose = function()
	{
		console.log("Lost connection to Kitsune server");
		setTimeout(connect, 2000);
	};
	webSocket.onmessage = function(e)
	{
		eval(e.data);
	};
};

var webSocket = null;
connect = function()
{
	webSocket = new WebSocket("ws://localhost:8081");
	setEventHandlers(webSocket);
};
connect();
