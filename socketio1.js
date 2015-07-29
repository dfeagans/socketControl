//First line creates the webserver and tells it how to handle requests (see handler functin below).
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

app.listen(8080);
console.log('Server Started on Port 8080');

//Upon a request, open index.html, and if that isn't a failure, send it to the client.
function handler (req, res) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
	if (err) {
	    res.writeHead(500);
	    return res.end('Error Loading Index.html');
	}

	res.writeHead(200);
	res.end(data);
    });
}

//Upon successful connection of the socket, the server emits a 'news' event.
//Upon the reception of a 'feedback' event from the client, the server console.logs the data sent back and emits another news event.
io.sockets.on('connection', function (socket) {
    socket.emit('news', { content: 'news from server'});
    socket.on('feedback', function (data) {
	console.log(data);
	socket.emit('news', { content: 'news - ' + new Date() });
    });
});
