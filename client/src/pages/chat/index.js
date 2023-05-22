import RoomAndUsersColumn from './room-and-users';
import MessagesReceived from './messages';
import SendMessage from './send-message';
import { Link } from 'react-router-dom';

const Chat = ({ username, room, socket }) => {
    return (
        <div className="grid grid-cols-1 gap-2 bg-white min-h-screen ">
            <nav className='m-4'>
                <ul>
                    <Link to="/" className='bg-[#ffbe01] max-w-8 px-4 rounded-2xl p-2 text-white hover:-translate-y-2 hover:shadow-gray-900 hover:shadow-md ease-in-out duration-300'>
                        Home
                    </Link>
                </ul>
            </nav>
            <div id="main-interface" className='grid grid-cols-2 gap-4  p-4'>
                <RoomAndUsersColumn socket={socket} username={username} room={room} />
                <MessagesReceived socket={socket} />
            </div>

            <SendMessage socket={socket} username={username} room={room} />
        </div>
    );
};

export default Chat;