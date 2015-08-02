socketControl
=============

This is an experiment into controlling hardware from and reporting physical sensor readings to a website. End goal would be a mobile-formatted website that allowed viewing a physical system's status and controlling its state.

+ [Node.js Succintly by Agus Kurniawan](https://www.syncfusion.com/resources/techportal/ebooks/nodejs) was useful for the initial "hello world" implementation and the latency test.
+ [Daniel Nill's socket.io tutorial](http://danielnill.com/nodejs-tutorial-with-socketio/) was a reasonably good tutorial. It had excellent wording to convey the concepts, but I didn't actually use any code from it.
+ [socket.io chat tutorial](http://socket.io/get-started/chat/) provided useful npm commands and utilized express to handle  routings and file serving in a more polished manner for the final project.

## Current Plan ##

+ [X] *Step 1: Set-up basic socket.io connection between a client and server.* A "hello world", if you will. Result: Basic example for Node.js Succintly employed.
+ [X] *Step 2: Test the latecy of the socket.io by measuring round-trip message time.* This would be performed by sending timestamps starting on connection to the client and returning them immedietely to the server. That event would trigger a new timestap (which would enable calculating a time delta) and triggering another send of the new time stamp to the client. This could be done for a reasonable amount of time to calculate latency statistics. Result: I was sending incredibly tiny time stamps, but it equated to 0.02 round trip, which equals about 50Hz AT BEST on my network at home.
+ [ ] *Step 3: Connect to another client computer in situ that communicates to the server, and thus the client.* The previous two steps involved creating a server that interacted with a client. This step involves connecting two clients using the server middle-man. This new client has to have access to the usb port, so off the top of my head it's either going to be a local node.js program running the socket.io-client lib to connect or a Chrome add-in. I'm gonig this route because I think it's more reproducible to install node and the client program or the Chrome add-in than run a local node program on the computer that has the sensors attached to it. I don't want to mess with any more complicated DNS/IP stuff than I have to.
  + [X] Node Client Program: Get a simple case of the socket.io-client lib working. Result: Very simple method. Not the prettiest because it would require installing Node on the computer that has the USB port though. Note: This required a very specific URL to connect i.e. it wouldn't work with the url frame record I had for dev.okdane.com to okdane.com:8080, I had to use http://okdane.com:8080.
  + [ ] Chrome Add-in: From within a Chrome Add-in, get a simple connection to the socket server. Then we'll
+ [ ] Connect directly to the computer's USB/serial port to expose the website to the physical system. The test interface will be a XBEE radio attached to a 2x16 character screen with a serial backpack. This is a simple package I have from another project that will just display whatever's pumped out of the USB port.
+ [ ] At some point, it's worth leveraging Express for it's routing and sendFile abstractions.
+ [ ] Display sensor data from the microcontroller and allow control from the website.
+ [ ] Make the system work with an XBEE wireless-USB radio.
+ [ ] Make things look good... maybe.

## Installation Steps for Future Reference ##

+ On a new project, install socket.io module using `npm install socket.io`. Obviously, it's not installed globally since it's a dependency of the project. Ideally you'd use `npm install scoket.io --save` to populate the dependencies list in the new project's package.json though. If you are starting from this project by git cloning it, just run `npm install` to get the socket.io lib. That installs all the dependencies outline in package.json that's included in the repo.
+ On the server, the socket.io is loaded using a simple `require('socket.io)`. On the client side, you just need `<script src="/socket.io/socket.io.js"></script>`.
