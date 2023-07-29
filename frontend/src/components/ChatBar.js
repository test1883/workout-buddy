import React, {useState, useEffect} from 'react';
import unify from '../utils/unify';


const ChatBar = ({socket}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        socket.emit("getUsers")
        socket.on("getUsersResponse", (data) => setUsers(data));
    }, [])
    useEffect(() => {
        socket.on('newUserResponse', (data) => setUsers(data));
    }, [socket, users]);
    return (
        <div className="chat__sidebar">
            <h2>Open Chat</h2>

            <div>
                <h4 className="chat__header">ACTIVE USERS</h4>
                <div className="chat__users">
                {unify(users).map((user) => (
                    <p key={user}>{user}</p>
                ))}
                </div>
            </div>
        </div>
    );
};

export default ChatBar;