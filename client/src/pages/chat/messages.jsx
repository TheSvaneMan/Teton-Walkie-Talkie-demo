// src/pages/chat/messages.jsx
import { useState, useEffect, useRef } from "react";

const Messages = ({ socket }) => {
  const [messagesReceived, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesColumnRef.current) {
      messagesColumnRef.current.scrollTop =
        messagesColumnRef.current.scrollHeight;
    }
  }, [messagesReceived]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesReceived((state) => [...state, data]);
    });
    return () => socket.off("receive_message");
  }, [socket]);

  useEffect(() => {
    socket.on("last_100_messages", (last100Messages) => {
      const parsed = JSON.parse(last100Messages);
      const sorted = parsed.sort(
        (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__),
      );
      setMessagesReceived((state) => [...sorted, ...state]);
    });
    return () => socket.off("last_100_messages");
  }, [socket]);

  function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div
      className="flex flex-col space-y-4 overflow-y-auto pr-2"
      ref={messagesColumnRef}
      style={{ height: "100%" }}
    >
      {messagesReceived.map((msg, i) => (
        <div key={i} className="flex flex-col">
          <div className="flex items-center space-x-2 px-2 mb-1">
            <span className="text-xs font-bold text-primary">
              {msg.username}
            </span>
            <span className="text-[10px] text-outline opacity-70">
              {formatTime(msg.__createdtime__)}
            </span>
          </div>
          <div className="relative max-w-[85%] self-start px-4 py-2 bg-surface-container-highest rounded-2xl rounded-tl-none shadow-sm text-on-surface-variant text-sm leading-relaxed">
            {msg.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
