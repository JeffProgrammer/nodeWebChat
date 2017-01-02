var socket = io();

socket.on('connect', function() {

	$('#sendMessage').click(function() {
		var message = $('#chatMessage').val();
		if (message === "")
			return;

		socket.emit('message', message);

		// clears chat box.
		$('#chatMessage').val('');
	});

	socket.on('messageReceived', function(data) {
		// We have received a message, add it to the HTML div.
		var p = $('<p></p>');
		p.text("Message: " + data);
		$('#chatBox').append(p);
	});
});