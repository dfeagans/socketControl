socketControl
=============

This is an experiment into controlling hardware from and reporting physical sensor readings to a website. End goal would be a mobile-formatted website that allowed viewing a physical system's status and controlling its state.

+ [Node.js Succintly by Agus Kurniawan](https://www.syncfusion.com/resources/techportal/ebooks/nodejs) was useful for the initial "hello world" implementation and the latency test.
+ [Daniel Nill's socket.io tutorial](http://danielnill.com/nodejs-tutorial-with-socketio/) was a reasonably good tutorial.
+ [socket.io chat tutorial](http://socket.io/get-started/chat/) provided useful npm commands and utilized express to handle  routings and file serving in a more polished manner for the final project.

## Current Plan ##

+ [X] Set-up basic socket.io connection between a client and server. A "hello world", if you will. Result: Basic example for Node.js Succintly employed.
+ [X] Test the latecy of the socket.io by measuring round-trip message time, This would be performed by sending timestamps starting on connection to the client and returning them immedietely to the server. That event would trigger a new timestap (which would enable calculating a time delta) and triggering another send of the new time stamp to the client. This could be done for a reasonable amount of time to calculate latency statistics. Result: I was sending incredibly tiny time stamps, but it equated to 0.02 round trip, which equals about 50Hz AT BEST on my network at home.
+ [ ] Connect to a computer in situ using a local Node program that communicates to the server, and thus the client.
+ [ ] Connect directly to the computer's USB/serial port to expose the website to the physical system.
+ [ ] Display sensor data from the microcontroller and allow control from the website.
+ [ ] Make the system work with an XBEE wireless-USB radio.
+ [ ] Make things look good... maybe.

## Installation Steps ##

+ Install socket.io module using npm install socket.io. Obviously, it's not install globally since it's a dependency of the project.
+ On the server, the socket.io is loaded using a simple `require('socket.io)`. On the client side, you just need `<script src="/socket.io/socket.io.js"></script>`.
