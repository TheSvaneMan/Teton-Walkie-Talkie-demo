import React from "react";
import RoomAndUsersColumn from "./room-and-users";
import MessagesReceived from "./messages";
import SendMessage from "./send-message";
import { useNavigate } from "react-router-dom";

// Import M3 Web Components
import "@material/web/iconbutton/icon-button.js";
import "@material/web/icon/icon.js";
import "@material/web/elevation/elevation.js";

const Chat = ({ username, room, socket }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-surface text-on-surface">
      {/* Top App Bar - M3 Style */}
      <header className="flex items-center px-4 py-2 bg-surface-container-low relative">
        <md-elevation></md-elevation>
        <md-icon-button onClick={() => navigate("/")}>
          <md-icon>arrow_back</md-icon>
        </md-icon-button>
        <div className="ml-4 flex flex-col">
          <span className="text-xl font-medium">Teton Walkie-Talkie</span>
          <span className="text-sm opacity-70">Room: {room}</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-1 overflow-hidden p-4 gap-4">
        {/* Sidebar: Users List (Tonal Elevation) */}
        <aside className="w-1/3 max-w-xs bg-surface-container-high rounded-3xl p-4 relative overflow-y-auto hidden md:block">
          <md-elevation></md-elevation>
          <RoomAndUsersColumn socket={socket} username={username} room={room} />
        </aside>

        {/* Chat Feed (Highest Elevation/Surface) */}
        <section className="flex-1 flex flex-col bg-surface-container rounded-3xl relative overflow-hidden">
          <md-elevation></md-elevation>
          <div className="flex-1 overflow-y-auto p-4">
            <MessagesReceived socket={socket} />
          </div>

          {/* Bottom Message Input Area */}
          <footer className="p-4 bg-surface-container-highest">
            <SendMessage socket={socket} username={username} room={room} />
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Chat;
