socketControl
=============

This is an experiment into controlling hardware from and reporting physical sensor readings to a website. End goal would be a mobile-formatted website that allowed viewing a physical system's status and controlling its state.

## Basic Socket.io Introductions ##

+ [socket.io chat tutorial](http://socket.io/get-started/chat/) provided useful npm commands and utilized express to handle routings and file serving in a more polished manner for the final project.
+ [Node.js Succintly by Agus Kurniawan](https://www.syncfusion.com/resources/techportal/ebooks/nodejs) was useful for the initial "hello world" implementation and the latency test.
+ [Daniel Nill's socket.io tutorial](http://danielnill.com/nodejs-tutorial-with-socketio/) was a reasonably good tutorial. It had excellent wording to convey the concepts, but I didn't actually use any code from it.

## More Intermediate Tutotials ##

+ [Connect 4 Example](http://code.tutsplus.com/tutorials/connect-4-with-socketio--cms-19869)
+ [Another Presentation Controller](http://tutorialzine.com/2015/02/smartphone-remote-control-for-presentations/)

## Project Steps ##
+ [X] *Step 1: Set-up basic socket.io connection between a client and server.* A "hello world", if you will. Result: Basic example for Node.js Succintly employed.

+ [X] *Step 2: Prove reasonable socket.io latency: Test the latecy of the socket.io by measuring round-trip message time.* This would be performed by sending timestamps starting on connection to the client and returning them immedietely to the server. That event would trigger a new timestamp (which would enable calculating a time delta) and triggering another send of the new time stamp to the client. This could be done for a reasonable amount of time to calculate latency statistics. Result: I was sending incredibly tiny time stamps, but it equated to 0.02 round trip, which equals about 50Hz AT BEST on my network at home.

+ [ ] *Step 3: Connect to another client computer in situ that communicates to the server, and thus the client.* The previous two steps involved creating a server that interacted with a client. This step involves connecting two clients using the server middle-man. This new client has to have access to the usb port, so off the top of my head it's either going to be a local node.js program running the socket.io-client lib to connect or a Chrome add-in. That's because both node and Chrome expose the USB port functionality; it can't be done in just a website in the browser. I'm going this route because installing  node and the client program or the Chrome add-in is more reproducible than run a local node server on the computer that has the sensors attached to it and hosts the website. I don't want to mess with any more complicated DNS/IP stuff than I have to.
  + [X] Node Client Program: Get a simple case of the socket.io-client lib working. Result: Very simple method. Not the prettiest because it would require installing Node on the computer that has the USB port though. Note: This required a very specific URL to connect i.e. it wouldn't work with the url frame record I had for dev.okdane.com to okdane.com:8080, I had to use http://okdane.com:8080.
  + [X] Chrome Add-in: From within a Chrome Add-in, get a simple connection to the socket server. [Reference This Entire Site](https://developer.chrome.com/apps/first_app). I used the [hello-world example](https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/hello-world) and added the smallest amount of code required to get a connection to the socket server program. This required saving the client socket.io.js lib locally, adding that reference to the manifest.json, and then within the main.js file (that contains the main app logic and is the "background" page), creating the connection at the right time.

+ [ ] *Step 4: Client-Server Client Communication* The above examples were just a client talking to the server, finally, connect the local client to the web-hosted client. This is the actual step where the server is acting like a true middle-man. Do this in a chrome add-on because that looks like the most promising implementation i.e. it avoids having to locally install Node. This might be the point where it's worth leveraging Express for it's routing and sendFile abstractions. [This example](https://github.com/johnpolacek/controldeck.js/) provides a brutally simple example of what this step is trying to achieve.
  + [ ] It's definitely worth creating a method for making it so that only one user can be piped through to the local client with USB. There needs to be some control of which page user is controlling/sensing. In the [example for the previous task](http://johnpolacek.github.io/controldeck.js/), ANY instance of the controller page open controls ALL instances of the presentation page. It might be possible to use some of the built-in socket.io concepts like namespaces to achieve it. This [game](http://modernweb.com/2013/09/30/building-multiplayer-games-with-node-js-and-socket-io/) has a good method for providing exclusive control by using an ID number. That's sufficient security for my applications.

+ [ ] *Step 5: Introducing USB* Using the chrome addon, directly connect to the computer's USB/serial port to expose the website to the physical system. [Chrome USB API Reference](https://developer.chrome.com/apps/app_usb). The test interface will be a XBEE radio attached to a 2x16 character screen with a serial backpack. This is a simple package I have from another project that will just display whatever's pumped out of the USB port.
  + [ ] Make the system work with an XBEE wireless-USB radio.
  + [ ] Blink an LED on a microcontroller through the USB.

+ [ ] *Step 6: Polish It Up* Make things look good and package it up so it's easier to utilize later... maybe.

## Next Steps ##

+ Re-read the basic Chat App example to remember the basics.
+ Read the [ ] controldeck.js, [ ] multiplayer game, [ ] Connect 4, and [ ] additional presentation controller examples to get back up to working speed. Definitely annotate the code for later reference as well.
+ Continue on with setting up the Client-Server-Client step of the project.

## Installation Steps for Future Reference ##

+ On a new project, install socket.io module using `npm install socket.io`. Obviously, it's not installed globally since it's a dependency of the project. Ideally you'd use `npm install scoket.io --save` to populate the dependencies list in the new project's package.json though. If you are starting from this project by git cloning it, just run `npm install` to get the socket.io lib. That installs all the dependencies outline in package.json that's included in the repo.
+ On the server, the socket.io is loaded using a simple `require('socket.io)`. On the client-side in the browser, you just need `<script src="/socket.io/socket.io.js"></script>`. To make a client-side program on the server, use `var socket = require('socket.io/node_modules/socket.io-client')('URL:PORT');` The previous line finds the socket.io-client lib that's installed under the socket.io lib. It's possible to install the socket.io.-client lib as a first class lib using `npm install socket.-io-client` but I haven't tested that. Then you'd just have to `var socket = require('socket.io-client');`.

## General Socket.io Notes ##

*Broadcasting*
In order to send an event to everyony, use ```io.emit```:
```
io.emit('some event', {thisIs : 'sentToEveryone});
```

If you want to send a message to everyone except for the "broadcasting" socket socket. Note it's using the connection event to provide the socket and identify it:

```Javascript
io.on('connection'), function(socket){
	socket.broadcast.emit('ThisIsSentToEveryoneElse');
})
```
