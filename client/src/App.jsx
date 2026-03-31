// src/App.jsx
import "./App.css";
import { useState, useEffect } from "react";
import Home from "./pages/home";
import Chat from "./pages/chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

// The server address - consider moving this to a .env file later
const socket = io.connect("http://localhost:4000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <Router>
      {/* In M3, we use a 'surface' background.
          The 'min-h-screen' ensures the background covers the whole device.
      */}
      <div className="App bg-surface text-on-surface min-h-screen font-roboto">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          <Route
            path="/chat"
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
