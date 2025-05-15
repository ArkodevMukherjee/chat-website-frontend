import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  // Handle room join
  const handleRoomJoin = () => {
    if (roomId.trim() === '') {
      alert('Please enter a valid room ID');
      return;
    }
    navigate(`/chatroom/${roomId}`);
  }

  // Handle creating a new room
  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2,8);
    navigate(`/chatroom/${newRoomId}`);
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-sky-500 to-indigo-500 text-white h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl text-center font-semibold mb-4 text-black">Join or Create a Chat Room</h1>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md text-black"
        />

        {/* Button to join the room */}
        <button
          onClick={handleRoomJoin}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Join Room
        </button>

        {/* Button to create a new room */}
        <button
          onClick={handleCreateRoom}
          className="w-full bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-600"
        >
          Create New Room
        </button>
      </div>
    </div>
  );
};

export default Home;