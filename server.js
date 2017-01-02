var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/chat.html');
});

app.get('/client.js', (req, res) => {
	res.sendFile(__dirname + "/client.js");
});

io.on('connection', function(socket) {
	// Connected!
	console.log("A client has connected!");

	socket.on('message', (data) => {
		io.emit('messageReceived', data);
	});

	socket.on('disconnect', () => {
		console.log("A client has disconnected!");
	});
});

http.listen(34122, () => {
	console.log('Listening on port 34122');
});