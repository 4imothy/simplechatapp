
const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');


const PORT = process.env.PORT || 3001;

const router = require('./router');

const app = express();

const server = http.createServer(app);
//instance of socket io
//var used to do things with socket.io
//const io = socketio(server);
let userNames = [];

const io = new Server(server, {
    //to connect to socket.io
    cors: {
        methods: ["Get", "Post"],
    }
});

server.listen(PORT, () =>
    console.log(`connected, port: ${PORT}`)
);

//listen to events 
io.on("connection", socket => {

    //use socket to listen to events
    console.log('there is new connection');

    //receive the sent message send to all other users
    socket.on('sentMessage', (data) => {
        const sendData = {
            sender: data.sender,
            msgText: data.inputData,
            style: {
                color: '#0D9851'
            }
        }
        //send to everyone but sender
        socket.to(data.room).emit('receiveMessage', sendData);
    });

    //join room
    socket.on('joinRoom', (data) => {
        socket.join(data.room);
        userNames[socket.id] = data.sender;
        console.log('length: '  + userNames.length);
        const sendData = {
            sender: data.sender,
            style: {
                color: 'darkblue'
            }
        }
        socket.nsp.to(data.room).emit('joinMessage', sendData);
    });

    //let user leave a room
    socket.on('leaveRoom', (data) => {

        const sendData = {
            sender: data.sender,
            style: {
                color: 'darkblue'
            }
        }
        socket.to(data.room).emit('leaveRoomMessage', sendData);
        socket.leave(data.room);
        console.log('user left room');
    });

    //user left
    socket.on("disconnecting", () => {
        //if it is in a room
        console.log(`user left: ${socket.id}`);
        var rooms = socket.rooms;
        var roomToLeave;
        //the second element is the room first is the id
        count = 0;
        for (let room of rooms) {
            if (count === 1)
                roomToLeave = room;
            count++;
        }
        const sendData = {
            sender: userNames[socket.id],
            style: {
                color: 'darkblue'
            }
        }
        socket.to(roomToLeave).emit('leaveRoomMessage', sendData);
    });

    socket.on("disconnect", () => {
        delete userNames[socket.id];
    });
});

app.use(router);
app.use(cors());