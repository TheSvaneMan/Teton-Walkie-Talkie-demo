
import { useState } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

const Home = ({ username, setUsername, room, setRoom, socket }) => {
    const navigate = useNavigate();
    const [formInputError, setFormInputError] = useState(false);
    const joinRoom = () => {
        try {
            if (room !== '' && username !== '') {
                socket.emit('join_room', { username, room });
                // Redirect to /chat
                navigate('/chat', { replace: true }); // Add this
            } else if (room === '') {
                setFormInputError("please select a room you would like to join.")
            } else if (username === '') {
                setFormInputError("please input your nurse id.")
            }
        } catch (error) {
            console.log("error launching chat: " + error)
        }

    };
    return (
        <div className={styles.container}>
            <div className="bg-[#7c3aed] p-4 rounded-xl grid grid-cols-1 gap-8 border-blue-200 shadow-xl shadow-gray-400">
                <span className='text-5xl text-bold'>
                    <h1 className='text-[#ffbe01]'>Teton Walkie-Talkie.</h1>
                    <h1 className='text-white'>Stay connected</h1>
                </span>

                <input
                    className={styles.input}
                    placeholder='Nurse id. e.g. au-4005-dc'
                    onChange={(e) => setUsername(e.target.value)}
                />

                <select
                    className={styles.input}
                    onChange={(e) => setRoom(e.target.value)}
                >

                    <option>Select Ward</option>
                    <option value='GeneralWard'>General Ward</option>
                    <option value='ICU'>Intensive Care Unit</option>
                    <option value='NICU'>Neonatal Intensive Care Unit</option>
                    <option value='PediatricWard'>Pediatric Ward</option>
                    <option value='MaternityWard'>Maternity Ward</option>
                    <option value='MaternityWard'>Maternity Ward</option>
                    <option value='GeriatricWard'>Geriatric Ward</option>
                    <option value='PsychiatricWard'>Psychiatric Ward</option>
                    <option value='IsolationWard'>Isolation Ward</option>
                    <option value='OncologyWard'>Oncology Ward</option>
                    <option value='CCU'>Cardiac Care Unit</option>
                </select>
                {
                    formInputError && <div className='transition  grid grid-cols-1 gap-2 justify-items-center'>
                        <span id="render-error" className='text-orange-400'>
                            {formInputError}
                        </span>

                    </div>}
                <span className="material-symbols-outlined text-white hover:-translate-y-1 ease-in-out duration-300 w-6 rounded-full hover:shadow-gray-900 hover:shadow-md">
                    help
                </span>
                <button
                    className='bg-[#ffbe01] rounded-2xl p-2 text-white hover:-translate-y-2 hover:shadow-gray-900 hover:shadow-md ease-in-out duration-300'
                    style={{ width: '100%' }}
                    onClick={joinRoom}
                >
                    Join Room
                </button>
            </div>
        </div>
    );
};

export default Home;