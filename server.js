//-----------------------------------------------------------------------------
// The MIT License (MIT)
// 
// Copyright (c) 2017 Jeff Hutchinson
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//-----------------------------------------------------------------------------

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