import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './main/Home';
import ChatRoom from './main/ChatRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatroom/:roomId" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
