import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';



// Use environment variable to allow switching between local and deployed
const socket = io(process.env.REACT_APP_BACKEND_URL, {
  transports: ['websocket'], // optional, more stable than polling
  withCredentials: true,
});


const ChatRoom = () => {
  const { roomId } = useParams(); // Extract roomId from URL
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Join the room using Socket.IO
    socket.emit('join-room', roomId);

    // Listen for incoming messages from the backend
    socket.on('receive-message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup listener on unmount
    return () => {
      socket.off('receive-message');
    };
  }, [roomId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Emit the message to the backend
      socket.emit('send-message', { roomId, message });
      setMessage('');
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-sky-500 to-indigo-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Chat Room: {roomId}
        </h1>
        <div className="mb-4 max-h-60 overflow-auto">
          {messages.map((msg, index) => (
            <div key={index} className="p-2 border-b border-gray-200">
              {msg}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;