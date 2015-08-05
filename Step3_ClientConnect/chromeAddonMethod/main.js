/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
  // Center window on screen.
  var screenWidth = screen.availWidth;
  var screenHeight = screen.availHeight;
  var width = 500;
  var height = 300;

  chrome.app.window.create('index.html', {
    id: "helloWorldID",
    outerBounds: {
      width: width,
      height: height,
      left: Math.round((screenWidth-width)/2),
      top: Math.round((screenHeight-height)/2)
    }
  });


// After the page is opened, the actual connection to the socket server is made.
// Note that any debug messages (like the console.logs below) are shown in the background window developer tools.
// They won't be shown int the main window for the program, defined by the index.html in this example.
	var socket = io.connect('http://okdane.com:8080');
	socket.on('connect', function() {
		console.log('CLIENT CONNECTED');
	});

	socket.on('news', function(data){
		console.log('CLIENT RECIEVED: ' + data);
		socket.emit('feedback', data)
	});
	
});
