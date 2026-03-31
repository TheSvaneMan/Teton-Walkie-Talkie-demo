import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import M3 Web Components
import "@material/web/list/list.js";
import "@material/web/list/list-item.js";
import "@material/web/button/outlined-button.js";
import "@material/web/icon/icon.js";
import "@material/web/divider/divider.js";

const RoomAndUsers = ({ socket, username, room }) => {
  const [roomUsers, setRoomUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      setRoomUsers(data);
    });

    return () => socket.off("chatroom_users");
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("leave_room", { username, room, __createdtime__ });
    navigate("/", { replace: true });
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header Area */}
      <div>
        <h2 className="text-sm font-medium tracking-wider text-outline uppercase px-4 mb-2">
          Active Room
        </h2>
        <div className="text-2xl font-semibold px-4 text-primary truncate">
          {room}
        </div>
      </div>

      <md-divider></md-divider>

      {/* Users List Area */}
      <div className="flex-1">
        <h5 className="text-sm font-medium text-outline px-4 mb-4">
          Nurses Online ({roomUsers.length})
        </h5>

        <md-list className="bg-transparent">
          {roomUsers.map((user) => (
            <md-list-item
              key={user.id}
              // M3 uses 'headline' for the main text
              headline={
                user.username === username
                  ? `${user.username} (You)`
                  : user.username
              }
              // Add a subtle icon or bullet
              style={{
                "--md-list-item-label-text-color":
                  user.username === username
                    ? "var(--md-sys-color-primary)"
                    : "var(--md-sys-color-on-surface)",
              }}
            >
              <md-icon slot="start">
                {user.username === username ? "account_circle" : "person"}
              </md-icon>
            </md-list-item>
          ))}
        </md-list>
      </div>

      {/* Action Area */}
      <div className="pt-4 px-2">
        <md-outlined-button
          onClick={leaveRoom}
          className="w-full"
          // M3 CSS variable to make it look 'destructive'
          style={{
            "--md-outlined-button-label-text-color": "#ba1a1a",
            "--md-outlined-button-outline-color": "#ba1a1a",
          }}
        >
          Leave Room
          <md-icon slot="icon">logout</md-icon>
        </md-outlined-button>
      </div>
    </div>
  );
};

export default RoomAndUsers;
