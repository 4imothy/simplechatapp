import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

//import components
import RoomNumberInput from './components/RoomNumberInput';
import JoinRoomButton from './components/JoinRoomButton';
import MessageInput from './components/MessageInput';
import SendMessageButton from './components/SendMessageButton';

//uncomment to work 
//const socket = io.connect("http://localhost:3001");
const socket = io.connect("https://myreachchatapp.herokuapp.com/");


function App() {
  //room
  const [room, setRoom] = useState("");
  //messages
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit('sentMessage', { message, room });
  }
  
  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessageReceived(data.message);
    });
  }, []);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("joinRoom", room);
    }
  };

  return (
    <div className="App">
      <RoomNumberInput onChange={(event) => {
        setRoom(event.target.value);
      }}
      />
      <JoinRoomButton onClick={joinRoom} />
      <br></br>
      <MessageInput
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <SendMessageButton onClick={sendMessage} />
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
