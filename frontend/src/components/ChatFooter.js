import React, { useState } from 'react';

const ChatFooter = ({socket, userName}) => {
  const [message, setMessage] = useState('');

  const handleTyping = () => socket.emit('typing', `${userName} is typing`);
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()){
        socket.emit('message', {
            text: message,
            name: userName,
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
        });
        console.log({ userName, message });
    }
    setMessage('');
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          onKeyUp={()=>socket.emit('typing', "")}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;