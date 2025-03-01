import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderBoard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;