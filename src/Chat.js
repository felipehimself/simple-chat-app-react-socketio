import React from 'react';
import { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import styled from 'styled-components';

const Chat = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setmessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('sendMessage', messageData);
      setmessageList((prev) => [...prev, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setmessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  return (
    <Wrapper>
      <div className='chat-header'>
        <p>Chat</p>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
          {messageList.map((item, index) => {
            const { message, time, author } = item;
            return (
              <div
                key={index}
                className='message'
                id={userName === author ? 'you' : 'other'}
              >
                <div>
                  <div className='message-content'>
                    <p>{message}</p>
                  </div>
                  <div className='message-meta'>
                    <p id='time'>{time}</p>
                    <p id='author'>{author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input
          value={currentMessage}
          type='text'
          placeholder='Type here...'
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 30rem;
  height: 42rem;

  .chat-header {
    text-align: center;
    border-top-left-radius: 0.6rem;
    border-top-right-radius: 0.6rem;
    background: #3d2c8d;
    position: relative;
    cursor: pointer;
    padding: 0.5rem;
    color: #fff;
    font-size: 1.8rem;
  }

  .chat-body {
    height: calc(450px - (45px + 70px));
    border: 1px solid #3d2c8d;
    background: #fff;

    position: relative;
  }

  .chat-body .message-container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .chat-body .message-container::-webkit-scrollbar {
    display: none;
    background: #f1f1f1
  }
  .chat-body .message {
    height: auto;
    padding: 1rem;
    display: flex;
  }

  .chat-body .message .message-content {
    width: auto;
    height: auto;
    max-width: 12rem;
    background-color: #3D2C8D;
    opacity: 0.8;
    border-radius: 5px;
    color: white;
    display: flex;
    align-items: center;
    padding: 5px 8px;
    font-size: 1.3rem;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  #you {
    justify-content: flex-start;
  }

  #you .message-content {
    justify-content: flex-start;
  }

  #you .message-meta {
    justify-content: flex-start;
    margin-left: 5px;
  }

  #other {
    justify-content: flex-end;
  }

  #other .message-content {
    justify-content: flex-end;
    background-color: #916BBF;
  }

  #other .message-meta {
    justify-content: flex-end;
    margin-right: 5px;
  }

  .message-meta #author {
    margin-left: 1rem;
    font-weight: bold;
  }

  .chat-body .message .message-meta {
    display: flex;
    font-size: 1.2rem;
  }

  .chat-footer {
    height: 4rem;
    border-top: none;
    display: flex;
    border: 0.5px solid #3d2c8d;
    border-top: 0;
  }

  .chat-footer input {
    height: 100%;
    flex: 85%;
    border: 0;
    padding: 0 0.7em;
    font-size: 1.4rem;
    border-right: 1px dotted #3d2c8d;
    border-top: none;
    outline: none;
  }

  .chat-footer button {
    border: none;
    display: grid;
    place-items: center;
    cursor: pointer;
    flex: 15%;
    height: 100%;
    background: transparent;
    outline: none;
    font-size: 2.5rem;
    color: lightgray;
    transition: all 0.3s ease;
  }

  .chat-footer button:hover {
    color: #3D2C8D;
  }
  .hide {
    opacity: 0 !important;
  }
`;

export default Chat;
