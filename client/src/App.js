import { useEffect, useState } from 'react';
import { socket } from './socket';
import './App.css';

//import components
import InputData from './components/InputData';
import ConfirmInputButton from './components/ConfirmInputButton';
import ChatTitle from './components/ChatTitle';
import UsernameDisplay from './components/UsernameDisplay';
import MessageContainer from './components/MessageContainer';

function App() {
  //keeps track of the amount of messages on screen
  const [msgCount, setMsgCount] = useState(0);
  //sender
  const [sender, setSender] = useState("");
  //room
  const [room, setRoom] = useState("");
  //chat title display
  const [chatTitleText, setChatTitleText] = useState("Live Chat Room:");
  //display username
  const [dispUserText, setDispUserText] = useState("Username: ");
  //messages make an array
  const [messages] = useState([]);

  //for inputs
  const [inputPlaceholder, setInputPlaceholder] = useState("Enter Username");
  //keep track of what data is being input first setting is room
  const [inputDataType, setInputDataType] = useState("username");
  const [inputData, setInputData] = useState("");

  //key down or onmousedown
  const downFunctions = {
    username: function(){
      setSender(inputData);
      setInputDataType("room");
      setInputPlaceholder("Enter Room");
    },
    room: function(){
      setRoom(inputData);
      setInputDataType("message");
      setInputPlaceholder("Enter Message");
    },
    message: function(){
      setMsgCount(msgCount + 1);
      setInputDataType("sendthedata");
    }
  }
  //key up or on mouse up
  const upFunctions = {
    room: function() {
      setDispUserText(`Username: ${inputData}`);
      setInputData("");
    },
    message: function(){
      setChatTitleText(`Live Chat Room: ${room}`);
      socket.emit("joinRoom", {room, sender});
      setInputData("");
    },
    sendthedata:function(){
      console.log('m: ' + inputData);
      socket.emit('sentMessage', { inputData, room, sender });
      messages.unshift(`You: ${inputData}`);
      setMsgCount(msgCount + 1);
      setInputData("");
    }
  }

  //to handle pressing enter to handle data
  const handleKeyDown = (event) => {
    //happens once per key down
    if (event.repeat)
      return;

    if (event.keyCode === 13) {
      console.log(`Enter: ${inputDataType}`);
      if (inputDataType === "username" && inputData !== "") {
        downFunctions.username();
        return;
      }
      if (inputDataType === "room" && inputData !== "") {
        downFunctions.room();
        return;
      }
      if (inputDataType === "message") {
        downFunctions.message();
        return;
      }
    }
  }

  //handle a click of the confirm input button
  const confInputClick = () => {
    //set the values
    if (inputDataType === "username" && inputData !== "") {
      downFunctions.username();
      return;
    }
    if (inputDataType === "room" && inputData !== "") {
      downFunctions.room();
      return;
    }
    if (inputDataType === "message") {
      downFunctions.message();
      return;
    }
  }

  const useValues = (event) => {
    if (event.repeat)
      return;
    if (event.keyCode === 13) {
      //send signals here
      //then room was just put in
      //user name was just entered
      if (inputDataType === "room") {
        upFunctions.room();
      }
      //the room was just entered
      if (inputDataType === "message") {
        upFunctions.message();
      }
      //then username was just put in
      if (inputDataType === "sendthedata") {
        upFunctions.sendthedata();
      }

    }
  }

  const releaseConfInput = () => {
    //use the values
    //then username was just put in
    if (inputDataType === "room") {       
       upFunctions.room();
    }
    //user room was just entered
    if (inputDataType === "message") {
      upFunctions.message();
    }
    //then room was just put in
    if (inputDataType === "sendthedata") {
      upFunctions.sendthedata();
    }
  }

  //to handle key down
  useEffect(() => {
    //to handle key down
    document.addEventListener('keydown', handleKeyDown);
    //use the values set by the handler above
    document.addEventListener('keyup', useValues);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', useValues);
    }
  });

  useEffect(() => {
    const receiveHandler = (data) => {
      //msg count becomes 0 here
      console.log('receive');
      messages.unshift(`${data.sender}: ${data.inputData}`);
      setMsgCount(msgCount + 1);
    }
    const joinHandler = (data) => {
      messages.unshift(`${data} Has Joined`);
      setMsgCount(msgCount + 1);
    }
    socket.on('receiveMessage', receiveHandler);
    socket.on('joinMessage', joinHandler);
    // so it only receives each message once
    return () => {
    socket.off('receiveMessage', receiveHandler);
    socket.off('joinMessage', joinHandler);
    }
  });

  return (
    <div className="App">
      <InputData placeholder={inputPlaceholder} value={inputData} onChange={(event) => {
        setInputData(event.target.value);
      }}
      />
      <ConfirmInputButton onMouseDown={confInputClick} onMouseUp={releaseConfInput}></ConfirmInputButton>
      <UsernameDisplay text={dispUserText} />
      <ChatTitle text={chatTitleText} />
      <MessageContainer text={chatTitleText} messages={messages} />
    </div>
  )
}

export default App;
