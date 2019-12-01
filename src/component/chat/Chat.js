import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import queryString from 'query-string'; //Retriving data from url
import io from 'socket.io-client';

let socket;
const Chat = ({location}) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    const {name, room} = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', {name,room}, ({error})=>{
      alert(error)
    });

    console.log(socket)

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
   
  },[ENDPOINT, location.search]);

  return (<h1></h1>)
  
}

export default Chat;