/**
 * express, socket.io, realtime nodejs example
 */

// load external module express
const express = require('express');
// load external module http
const http = require('http');
// load external module socket
const Socket = require('socket.io');
// create a express application
const app = express();
// create a http server with the express app
const server = http.Server(app)
// create a socket io instance with the http
const io = new Socket(server)
// define listening port
const port = process.env.PORT || 80 || 3000;


// serve static frontend files
app.use(express.static(__dirname + '/public'));

// function to handle the socket connection
const handleSocketConnection = (socket) => {
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
    socket.on('reset', (data) => socket.broadcast.emit('reset', data));
};

// add function to the connection event
io.on('connection', handleSocketConnection);

// let the server listen to the defined port
server.listen(port, () => console.log(`server listening on port ${port}`))
