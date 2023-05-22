
import styles from './styles.module.css';
import React, { useState } from 'react';

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit('send_message', { username, room, message, __createdtime__ });
      setMessage('');
    }
  };

  return (
    <div className="grid grid-cols-8 gap-4 max-h-8 mx-4">
      <input
         className='col-span-6 text-black border-[#ffbe01] border px-8 py-2 rounded-2xl p-2 hover:-translate-y-2 hover:shadow-gray-900 hover:shadow-md ease-in-out duration-300'
                    
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className='bg-[#ffbe01] rounded-2xl p-2 text-white hover:-translate-y-2 hover:shadow-gray-900 hover:shadow-md ease-in-out duration-300'
        onClick={sendMessage}>
        Send Message
      </button>

    </div>
  );
};

export default SendMessage;