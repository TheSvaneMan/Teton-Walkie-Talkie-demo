import React, { useState } from "react";

// Import M3 Web Components
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/iconbutton/filled-icon-button.js";
import "@material/web/icon/icon.js";

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim() !== "") {
      const __createdtime__ = Date.now();
      socket.emit("send_message", { username, room, message, __createdtime__ });
      setMessage("");
    }
  };

  // Handle 'Enter' key to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex items-center gap-3 w-full max-w-4xl mx-auto px-2">
      {/* M3 Outlined Text Field */}
      <md-outlined-text-field
        className="flex-1"
        placeholder="Type a message..."
        value={message}
        onInput={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        // Customizing the shape to be 'Extra Large' (fully rounded)
        style={{
          "--md-outlined-text-field-container-shape": "28px",
          "--md-outlined-text-field-label-text-color":
            "var(--md-sys-color-primary)",
        }}
      >
        <md-icon slot="leading-icon">chat_bubble</md-icon>
      </md-outlined-text-field>

      {/* M3 Filled Icon Button (Circular/FAB style) */}
      <md-filled-icon-button
        onClick={sendMessage}
        disabled={!message.trim()}
        style={{
          "--md-filled-icon-button-container-width": "52px",
          "--md-filled-icon-button-container-height": "52px",
        }}
      >
        <md-icon>send</md-icon>
      </md-filled-icon-button>
    </div>
  );
};

export default SendMessage;
