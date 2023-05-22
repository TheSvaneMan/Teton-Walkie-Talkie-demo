import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomAndUsers = ({ socket, username, room }) => {
  const [roomUsers, setRoomUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on('chatroom_users', (data) => {
      console.log(data);
      setRoomUsers(data);
    });

    return () => socket.off('chatroom_users');
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { username, room, __createdtime__ });
    // Redirect to home page
    navigate('/', { replace: true });
  };

  return (
    <div className="grid grid-cols-1 gap-2 px-2">
      <h2 className="text-4xl font-bold from-pink-400  via-pink-600 to-white bg-gradient-to-r bg-clip-text text-transparent">Room: {room}</h2>

      <div className='grid grid-cols-1 bg-[#9370DB] rounded-md p-2'>
        {roomUsers.length > 0 && <h5 className="text-2xl">Nurses in chat room</h5>}
        <ul className="grid grid-cols-1 rounded-2xl">
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? 'text-[#ffbe01]' : 'normal'}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <button className='border-[#ffbe01] max-h-12 max-w-8 border text-black bg-white rounded-2xl p-2 hover:-translate-y-2 hover:shadow-gray-900 hover:shadow-md ease-in-out duration-300 hover:bg-[#ffbe01] hover:bg-opacity-20' onClick={leaveRoom}>
        Leave Room
      </button>
    </div>
  );
};

export default RoomAndUsers;