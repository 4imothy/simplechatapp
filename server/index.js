
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
io.on("connection", (socket) => {

    //use socket to listen to events
    console.log('there is new connection');

    //receive the sent message send to all other users
    socket.on('sentMessage', (data) => {
        console.log('message was sent');
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
    });

    //user left
    socket.on('disconnect', () => {
        console.log('user has left');
    });
});

app.use(router);
app.use(cors());

/*
//create express server
const express = require('express');
//instance of the express library
const app = express();
//create instance of http library
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

//apply middleware
app.use(cors());

const server = http.createServer(app);

//var used to do things with socket.io
const io = new Server(server, {
    //to connect to socket.io
    cors: {
        origin: "http://localhost:3000",
        methods: ["Get", "Post"],
    }
});

//listen to 3001 port cause server on 3000
server.listen(3001, () => {
    console.log('server is running')
});

//listen to events 
io.on("connection", (socket) => {
    //use socket to listen to events 

    //receive the sent message send to all other users
    socket.on('sentMessage',(data) =>{
        //send to everyone but sender
        socket.to(data.room).emit("receiveMessage", data);
    });

    //join room
    socket.on('joinRoom', (data) =>{
        socket.join(data);
    });
});
*/