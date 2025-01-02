const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

app.use(express.static('static'));

io.on('connection', (socket) => {
    socket.on('draw', (data) => {
        socket.broadcast.emit('draw', data);
    })
})

server.listen(PORT, () => {
    console.log(`Real Time Whiteboard Application Running At http://localhost:${PORT}`);
})