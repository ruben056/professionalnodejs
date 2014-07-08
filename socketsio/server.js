// socket.io in combination with httpserver
// all requests under /socket.io are handled by socket.io.js code (can be creating websocket connection or returning the static js file for client)
// all other requests are handled by the http server for instance returning the index.html to start from
var httpd = require('http').createServer(handler);
var io = require('socket.io').listen(httpd);
var fs = require('fs');


httpd.listen(4000);
function handler(req, res) {
	fs.readFile(__dirname + '/index.html',
	function(err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
	res.writeHead(200);
	res.end(data);
	});
}

// client connects
// handlers for events are set
io.sockets.on('connection', function (socket) {
	
	socket.emit('loginRequest', 'Please provider your chat name:');

	socket.on('loginReply', function(userName){
		socket.userName = userName;
		socket.emit('serverMsg', 'Welcome ' + userName + ' you are now logged in.');
		socket.broadcast.emit('serverMsg', userName + ' has just logged in.');
	})

	socket.on('join', function(room){
		socket.room = room;
		socket.join(room);
		socket.broadcast.to(room).emit('serverMsg', socket.userName + ' has just logged in.');
	})

	socket.on('clientMsg', function(msg) {
		if(socket.room){
			socket.emit('serverMsg', 'You said: ' + msg);
			socket.broadcast.to(socket.room).emit('serverMsg', socket.userName + ' said: ' + msg);
		}
		else{
			socket.emit('serverMsg', 'First join a room : /j room1 ');
		}
	});

	// client disconnects
	// other clients are informed
	socket.on('disconnect', function() {
		if(socket.room){
			socket.broadcast.emit('serverMsg', 'User ' + socket.userName + ' disconnected');
		}
		else{
			socket.emit('serverMsg', 'User ' + socket.userName + ' disconnected');
		}
	});

});