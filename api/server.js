    const express = require('express');
    const http = require('http');
    const { Server } = require('socket.io');

    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);
    const PORT = process.env.PORT || 3000;

    const cors = require('cors');

    let users = 0;

    app.use(cors({
        origin: ['https://fastwhiteboard.vercel.app'],
        methods: ['GET', 'POST']
    }));

    app.use(express.static('static'));

    io.on('connection', (socket) => {
        users++;
        io.emit('userCount', users);

        socket.on('drawing', (data) => {
            socket.broadcast.emit('drawing', data);
        });

        socket.on('clearBoard', () => {
            io.emit('clearBoard');
        })

        socket.on('disconnect', () => {
            users--;
            io.emit('userCount', users);
        });

    });

    server.listen(PORT, () => {
        console.log(`Real Time Whiteboard Application Running At http://localhost:${PORT}`);
    });
