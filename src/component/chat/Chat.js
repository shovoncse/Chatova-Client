import React , { useState, useEffect } from 'react'; // React component
import { Link } from 'react-router-dom'; // For Routing
import queryString from 'query-string'; //Retriving data from url
import io from 'socket.io-client'; // Socket io for client side

// initial declearation
let socket;

// Destructured location object is the props of chat component (functional)
const Chat = ({location}) => {

  // Initial State with UseState Hook
  //Here: name is the state name, setName is the state changing function, useState() is the initial value setter function
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // The point where websocket will connect
  const ENDPOINT = 'http://localhost:5000';

  // Hook (ComponentDidMount)
  useEffect(() => {

    // Destructuring 'location.search' object
    const {name, room} = queryString.parse(location.search);

    // Set Endpoint to socket-io-client and assigned to initially decleared socket variable
    socket = io(ENDPOINT);

    // Changing State
    setName(name);
    setRoom(room);

    // Triggering / Emitting 'Join'
    socket.emit('join', {name,room}, (data)=>{
      console.log(data)
    });

    // Test Purpose
    //console.log(socket)

    // Return is The way of unmounting (ComponentDidUnmount)
    return () => {

      // Triggering / Emitting 'disconnect'
      socket.emit('disconnect');
      socket.off();
    }
   
    // This useEffect will trigger only when the endpoint or location.search value will change
  },[ENDPOINT, location.search]);


  useEffect(()=>{
    socket.on('message', (message)=>{
      setMessages([...messages, message]);
    });

  },[messages]);

  // SendMessage

  const sendMessage = (e) => {
    e.preventDefault();
    if(message){
      socket.emit('sendMessage',message, ()=>{
        setMessage('');
      })
    }
  }

  // Return from chat component
  return (
  <div className="outerContainer">
    <div className="container">
      <input type="text" value={message} onChange={(e)=>{setMessage(e.target.value)}} onKeyUp={(e)=> e.key === 'Enter'? sendMessage(e):null}/>
    </div>
  </div>
  )
  
}

// Exporting modules
export default Chat;