var express = require('express');
var app = express();
// Below uses app (Express) as the function handler for the http server.
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = 8080;

//Uses the Express static middleware to serve up the public dir.
//Note that express.static serves up the directory relative to the directory you're in when you LAUNCH the node process. The below makes it so that the directory served is at least always relative to this file, by using the aboslute path to this file, then the dir I want to serve up. If it was just `express.statitc('public') and if I started running index.js in my home directory using `node /home/ubuntu/socketControl/Step4_ClientServerClient/index.js` this would serve up the public directory within my home directory. Again, it's relative to the directoryI'm in when I launch the process.

app.use(express.static(__dirname + 'public'));

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.emit('test', "TEST");
});

http.listen(PORT, function() {
    console.log('listening on Port ' + PORT);
});
