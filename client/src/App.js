import { useEffect, useState } from 'react';
import { socket } from './socket';

//import components
import RoomNumberInput from './components/RoomNumberInput';
import JoinRoomButton from './components/JoinRoomButton';
import MessageInput from './components/MessageInput';
import SendMessageButton from './components/SendMessageButton';
import MessageContainer from './components/MessageContainer';
import SenderInput from './components/SenderInput';
import SenderButton from './components/SenderButton';

function App() {
  //keeps track of the amount of messages on screen
  const [msgCount, setMsgCount] = useState(0);
  //sender
  const [sender, setSender] = useState("");
  const [tempSender, setTempSender] = useState("");
  //room
  const [room, setRoom] = useState("");
  //chat title display
  const [title, setTitle] = useState("Live Chat Room:");
  //messages make an array
  const [messages] = useState([]);
  //default
  //messages
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    //also add for the sender with 'you: '
    socket.emit('sentMessage', { message, room, sender });
    messages.push(`You: ${message}`);
    setMsgCount(msgCount + 1);
    console.log('smc: ' + msgCount);
  }

  useEffect(() => {
    const handler = (data) => { 
      //msg count becomes 0 here
      console.log('receive');
      messages.push(`${data.sender}: ${data.message}`);
      setMsgCount(msgCount + 1);
      console.log('rmc: ' + msgCount);
    }
    socket.on('receiveMessage', handler);
    return () => socket.off('receiveMessage', handler);
  });

  const joinRoom = () => {
    if (room !== "") {
      setTitle(`Live Chat Room: ${room}`);
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
      <SenderInput id='senderInput' onChange={(event) => {
        setTempSender(event.target.value);
      }} />
      <SenderButton onClick={() => {
        if (tempSender) {
          console.log('set sender');
          setSender(tempSender);
        }
      }} />
      <br></br>
      <MessageInput
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <SendMessageButton onClick={sendMessage} />
      <MessageContainer text={title} messages={messages} />
    </div>
  );
}

export default App;
