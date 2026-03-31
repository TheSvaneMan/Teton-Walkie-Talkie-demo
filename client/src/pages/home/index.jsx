import React from "react";
import { useNavigate } from "react-router-dom";

import "@material/web/button/filled-button.js";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/elevation/elevation.js";
import "@material/web/list/list.js";
import "@material/web/list/list-item.js";
import "@material/web/icon/icon.js";

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();
  const popularRooms = ["Emergency", "Pediatrics", "Radiology", "Surgery"];

  const joinRoom = () => {
    // Validate on click instead of relying on the 'disabled' prop
    if (room.trim() === "" || username.trim() === "") {
      alert("Please enter both a Name and a Room.");
      return;
    }

    socket.emit("join_room", { username, room });
    navigate("/chat", { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-surface p-4">
      <div className="relative flex flex-col w-full max-w-md p-8 gap-6 bg-surface-container-high rounded-[28px] shadow-sm">
        <md-elevation></md-elevation>

        <div className="text-center">
          <h1 className="text-3xl font-semibold text-primary mb-2">
            Teton Walkie
          </h1>
          <p className="text-on-surface-variant text-sm">
            Sign in to start communicating
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <md-outlined-text-field
            label="Your Name"
            // Removed 'value' to prevent React property freezing
            onInput={(e) => setUsername(e.target.value)}
            className="w-full"
          >
            <md-icon slot="leading-icon">person</md-icon>
          </md-outlined-text-field>

          <md-outlined-text-field
            label="Room Name"
            onInput={(e) => setRoom(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && joinRoom()}
            className="w-full"
            // If the user clicks a Quick Join room, we can force the UI to update via a key
            key={room}
            value={room} // Safe to use here because the list click forces a re-render
          >
            <md-icon slot="leading-icon">meeting_room</md-icon>
          </md-outlined-text-field>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-medium text-outline px-4 uppercase tracking-wider">
            Quick Join
          </h3>
          <md-list className="bg-surface-container rounded-2xl overflow-hidden">
            {popularRooms.map((roomName) => (
              <md-list-item
                key={roomName}
                onClick={() => setRoom(roomName)}
                className="cursor-pointer"
              >
                <div slot="headline">{roomName}</div>
                <md-icon slot="start">tag</md-icon>
              </md-list-item>
            ))}
          </md-list>
        </div>

        <md-filled-button onClick={joinRoom} className="w-full mt-2">
          Join Chat
          <md-icon slot="icon">login</md-icon>
        </md-filled-button>
      </div>
    </div>
  );
};

export default Home;
