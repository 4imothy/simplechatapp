import io from 'socket.io-client';

export const socket = io.connect("http://localhost:3001");
//for build
//export const socket = io.connect("https://myreachchatapp.herokuapp.com/");