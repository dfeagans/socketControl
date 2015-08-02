//The line below automatically finds the socket.io-client library that's deep within the node-modules dir.
//That means this dependency would get install usign `npm install scoket.io` , NOT `npm install socket.io-client`.

//The URL was finicky. It didn't work with the URL frame record I had where http://okdane.com:8080 was maped to the sub-domain dev.okdane.com. To get it to work, I had to use the full http://URL.com:PORT.
var socket = require('socket.io/node_modules/socket.io-client')('http://okdane.com:8080');
socket.on('connect', function() {
    console.log('CLIENT CONNECTED');
});

socket.on('news', function(data) {
    console.log('CLIENT RECIEVED: ' + data);
});

