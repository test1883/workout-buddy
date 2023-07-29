import React, { useEffect, useRef, useState } from 'react';
import ChatBar from '../components/ChatBar';
import ChatBody from '../components/ChatBody';
import ChatFooter from '../components/ChatFooter';
import { useAuthContext } from '../hooks/useAuthContext';

const Chat = () => {
    console.log("ehehehheheheh")
    const [messages, setMessages] = useState([])
    const { user } = useAuthContext()
    const [typingStatus, setTypingStatus] = useState('');
    const lastMessageRef = useRef(null);  
    useEffect(() => {
        console.log("here")
        user.socket.on("messageResponse", (data) => setMessages([...messages, data]))
    }, [user.socket, messages, user])

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    useEffect(() => {
        user.socket.on('typingResponse', (data) => setTypingStatus(data));
    }, [user.socket]);
    return (
        <div className="chat">
        <ChatBar socket={user.socket}/>
        <div className="chat__main">
            <ChatBody messages={messages} userName={user.userName} lastMessageRef={lastMessageRef} typingStatus={typingStatus}/>
            <ChatFooter socket={user.socket} userName={user.userName}/>
        </div>
        </div>
  );
};

export default Chat;