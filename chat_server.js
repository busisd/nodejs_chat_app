var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const port = 3000;
const hostname = '127.0.0.1';

server.listen(port, hostname);

app.get('/', function(req,res) {
	console.log("request received: /");
	res.end("Hello there!");
});

app.get('/hello', function(req,res) {
	console.log("request received: /hello");
	res.end("How do you do?");
});

app.get('/hello/:name', function(req,res) {
	console.log("request received: /hello");
	res.end("How do you do, "+req.params.name+"?");
});






