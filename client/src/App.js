import { useEffect, useState } from 'react';
import { socket } from './socket';
import './App.css';

//import components
import InputData from './components/InputData';
import ConfirmInputButton from './components/ConfirmInputButton';
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
  const [chatTitle, setChatTitle] = useState("Live Chat Room:");
  //display username
  const [dispUserText, setDispUserText] = useState("Username: ");
  //messages make an array
  const [messages] = useState([]);

  //for inputs
  const [inputPlaceholder, setInputPlaceholder] = useState("Enter Room Code");
  //keep track of what data is being input first setting is room
  const [inputDataType, setInputDataType] = useState("room");
  const [inputData, setInputData] = useState("");


  //to handle pressing enter to handle data
  const handleKeyDown = (event) => {
    //happens once per key down
    if (event.repeat)
      return;

    if (event.keyCode === 13) {
      console.log(`Enter: ${inputDataType}`);
      if (inputDataType === "room" && inputData !== "") {
        setRoom(inputData);
        setInputDataType("username");
        setInputPlaceholder("Enter Username");
        return;
      }
      if (inputDataType === "username" && inputData !== "") {
        setSender(inputData);
        setInputDataType("message");
        setInputPlaceholder("Enter Message");
        return;
      }
      if (inputDataType === "message") {
        setMsgCount(msgCount + 1);
        setInputDataType("sendthedata");
        return;
      }
    }
  }

  const useValues = (event) => {
    if (event.repeat)
      return;
    if (event.keyCode === 13) {
      //send signals here
      //then room was just put in
      if (inputDataType === "username") {
        setChatTitle(`Live Chat Room: ${room}`);
        socket.emit("joinRoom", room);
        setInputData("");
      }
      //user name was just entered
      if (inputDataType === "message") {
        setDispUserText(`Username: ${inputData}`);
        setInputData("");
      }
      //then username was just put in
      if (inputDataType === "sendthedata") {
        console.log('m: ' + inputData);
        socket.emit('sentMessage', { inputData, room, sender });
        messages.unshift(`You: ${inputData}`);
        setMsgCount(msgCount + 1);
        setInputData("");
      }

    }
  }

  //handle a click of the confirm input button
  const confInputClick = () => {
    //set the values
    if (inputDataType === "room" && inputData !== "") {
      setRoom(inputData);
      setInputDataType("username");
      setInputPlaceholder("Enter Username");
      return;
    }
    if (inputDataType === "username" && inputData !== "") {
      setSender(inputData);
      setInputDataType("message");
      setInputPlaceholder("Enter Message");
      return;
    }
    if (inputDataType === "message") {
      setMsgCount(msgCount + 1);
      setInputDataType("sendthedata");
      return;
    }
  }

  const releaseConfInput = () =>{
     //use the values
    //then room was just put in
    if (inputDataType === "username") {
      setChatTitle(`Live Chat Room: ${room}`);
      socket.emit("joinRoom", room);
      setInputData("");
    }
    //user name was just entered
    if (inputDataType === "message") {
      setDispUserText(`Username: ${inputData}`);
      setInputData("");
    }
    //then username was just put in
    if (inputDataType === "sendthedata") {
      console.log('m: ' + inputData);
      socket.emit('sentMessage', { inputData, room, sender });
      messages.unshift(`You: ${inputData}`);
      setMsgCount(msgCount + 1);
      setInputData("");
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
    const handler = (data) => {
      //msg count becomes 0 here
      console.log('receive');
      messages.unshift(`${data.sender}: ${data.inputData}`);
      setMsgCount(msgCount + 1);
    }
    socket.on('receiveMessage', handler);
    // so it only receives each message once
    return () => socket.off('receiveMessage', handler);
  });

  return (
    <div className="App">
      <InputData placeholder={inputPlaceholder} value={inputData} onChange={(event) => {
        setInputData(event.target.value);
      }}
      />
      <ConfirmInputButton onMouseDown={confInputClick} onMouseUp={releaseConfInput}></ConfirmInputButton>
      <UsernameDisplay text={dispUserText} />
      <MessageContainer text={chatTitle} messages={messages} />
    </div>
  )
}

export default App;
