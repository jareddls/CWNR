import React from 'react'
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const URL_PATH = '/ts'
const socket = io(`http://localhost:3000`);

const TestingSocket = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    const sendMessage = (message, room) => {
        if (room === "") {
            socket.broadcast.emit("receive-message", message)
        }
        else {
            socket.to(room).emit("receive-message", message)
        }
      
    };

    const joinRoom = (room) => {
        socket.emit('join-room', room, message => {
            sendMessage(message)
        })
    }
  
    return (
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <input type="text" onKeyDown={(event) => {
          if (event.key === 'Enter') {
            sendMessage(event.target.value);
            event.target.value = '';
          }
        }} />

        <input type="text" onKeyDown={(event) => {
          if (event.key === 'Enter') {
            joinRoom(event.target.value);
            // event.target.value = '';
          }
        }} />
      </div>
    );
}

export default TestingSocket