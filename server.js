var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var connection = require('./db.js').connection;

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

		// Store chat in database, preparing query.
		storeChatMessage(data);
	});

	socket.on('disconnect', () => {
		console.log("A client has disconnected!");
	});
});

http.listen(34122, () => {
	console.log('Listening on port 34122');
});

function storeChatMessage(data) {
	var query = "INSERT INTO chat (message) VALUES(?);";
	query = mysql.format(query, [data]);
	connection.query(query, function(err, result) {
		if (err) {
			console.log("Inserting chat message failed.");
			console.log(err);
		}
	});
}