import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';

const Messages = ({ socket }) => {
    const [messagesRecieved, setMessagesReceived] = useState([]);

    const messagesColumnRef = useRef(null); // Add this

    // Runs whenever a socket event is recieved from the server
    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data);
            setMessagesReceived((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    __createdtime__: data.__createdtime__,
                },
            ]);
        });

        // Remove event listener on component unmount
        return () => socket.off('receive_message');
    }, [socket]);

    // --- UI and rendering -- //
    function sortMessagesByDate(messages) {
        return messages.sort(
            (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
        );
    }

    useEffect(() => {
        // Last 100 messages sent in the chat room (fetched from the db in backend)
        socket.on('last_100_messages', (last100Messages) => {
            console.log('Last 100 messages:', JSON.parse(last100Messages));
            last100Messages = JSON.parse(last100Messages);
            // Sort these messages by __createdtime__
            last100Messages = sortMessagesByDate(last100Messages);
            setMessagesReceived((state) => [...last100Messages, ...state]);
        });
        return () => socket.off('last_100_messages');
    }, [socket]);

    // dd/mm/yyyy, hh:mm:ss
    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        // Add ref to this div
        <div className="text-black rounded-md border border-gray-200 p-4" ref={messagesColumnRef}>
          {messagesRecieved.map((msg, i) => (
            <div key={i} className='border border-gray-900 px-2 py-2 max-h-16 my-4 rounded-md'>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className={styles.msgMeta}>{msg.username}</span>
                <span className={styles.msgMeta}>
                  {formatDateFromTimestamp(msg.__createdtime__)}
                </span>
              </div>
              <p className="text-black">{msg.message}</p>
              <br />
            </div>
          ))}
        </div>
      );
};

export default Messages;