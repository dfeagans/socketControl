var TESTTIME = 5000;
//The belo line creates the webserver and tells it how to handle requests (see handler functin below).
var app = require('http').createServer(handler);
//The below line actually loads the socket.io library and tells it to listen to any pages loaded by the server that have WebSockets in them.
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
io.sockets.on('connection', function(socket) {
    var latencyTimes = [];
    setTimeout(function() {
	socket.disconnect();
	fs.writeFile('./socketLatency.dat', JSON.stringify(latencyTimes), function(err) {
	    if (err) {
		console.error('FAILED TO SAVE TO: socketLatency.dat');
	    } else {
		console.log('SAVED LATENCY DATA TO: socketLatency.dat');
	    }
	})
    }, TESTTIME);
    socket.emit('news', new Date().getTime());
    socket.on('feedback', function(data) {
	var newDate = new Date().getTime();
	// console.log('newDate:' + newDate);
	// console.log('Returned Date:' + data);
	// I had to use the .getTime method because for some reason it was changing time formats when passed back from the client.
	//Below displays the lag time in actual seconds. It required dividing by 1000 since that's the typical time format in JS.
	console.log((newDate - data)/1000);
	latencyTimes.push((newDate - data)/1000);
	socket.emit('news', newDate);
    });
});
