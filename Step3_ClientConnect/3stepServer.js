//The below line creates the webserver and tells it how to handle requests (see handler functin below).
var app = require('http').createServer();    //WITHIN THE createServer METHOD USUALLY GOES THE handler FUNCTION BELOW, BUT TO TEST HOW MINIMILIST I COULD MAKE THE PROGRAM I REMOVED IT AND SUPPRESSED THE HANDLER BELOW.
//The below line actually loads the socket.io library and tells it to listen to any pages loaded by the server that have WebSockets in them.
var io = require('socket.io').listen(app);
//var fs = require('fs');

var PORT = 8080;
app.listen(PORT);
console.log('SERVER STARTED ON PORT: ' + PORT);

//Upon a request, open index.html, and if that isn't a failure, send it to the client.
// function handler (req, res) {
//     fs.readFile(__dirname + '/index.html', function (err, data) {
// 	if (err) {
// 	    res.writeHead(500);
// 	    return res.end('Error Loading Index.html');
// 	}

// 	res.writeHead(200);
// 	res.end(data);
//     });
// }

//Upon successful connection of the socket, the server emits a 'news' event.
//Upon the reception of a 'feedback' event from the client, the server console.logs the data sent back and emits another news event.
io.sockets.on('connection', function(socket) {
    console.log("SERVER CONNECTED");
    socket.emit('news', "TEST DATA");
});

