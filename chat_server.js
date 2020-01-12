var express = require('express');
var http = require('http');
var socketio = require('socket.io')
const path = require('path');

var app = express();
app.use(express.static('public'))

var server = http.Server(app);
var io = socketio(server);

const port = 3000;
const hostname = '0.0.0.0';

server.listen(port, hostname);

app.get('/', function(req,res) {
	console.log("request received: "+req.url);
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/hello', function(req,res) {
	console.log("request received: "+req.url);
	res.end("How do you do?");
});

app.get('/hello/:name', function(req,res) {
	console.log("request received: "+req.url);
	res.end("How do you do, "+req.params.name+"?");
});

io.on('connection', function(socket) {
	console.log("user connected!");
	
	socket.on('disconnect', function() {
		console.log("User disconnected");
	});
	
	socket.on('new chat', function(new_chat) {
		console.log("New chat: ", new_chat);
		io.emit('message', new_chat);
	});
});







