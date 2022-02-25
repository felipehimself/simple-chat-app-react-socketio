import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';
import styled from 'styled-components';

const socket = io.connect('http://localhost:3001');

function App() {
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== '' && room !== '') {
      socket.emit('joinRoom', room);
      setShowChat(true);
    }
  };

  return (
    <Wrapper>
      {!showChat ? (
        <div className='join-container'>
          <h3>Start chating</h3>
          <input
            type='text'
            placeholder='Name'
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <input
            type='text'
            placeholder='Room ID (e.g. 123)'
            onChange={(event) => {
              setRoom(event.target.value);
            }}
            onKeyPress={(e) => e.key === 'Enter' && joinRoom()}
          />
          <button onClick={joinRoom}>Join Now</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  max-width: 30rem;
  margin: 6rem auto 0 auto;
  background: #fff;

  .join-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .join-container h3 {
    font-size: 3.5rem;
    color: #3d2c8d;
  }
  .join-container input {
    width: 100%;
    border: 2px solid #3d2c8d;
    border-radius: 5px;
    padding: 5px;
    font-size: 1.6rem;
    font-family: inherit;
  }

  .join-container input:focus {
    outline: none;
    border: 2px solid #1c0c5b;
  }

  .join-container button {
    width: 100%;
    border: none;
    border-radius: 5px;
    padding: 0.8rem;
    font-size: 1.6rem;
    background: #3d2c8d;
    color: #fff;
    cursor: pointer;
    transition: all 0.4s ease;
    font-family: inherit;
  }

  .join-container button {
    width: 100%;
    border: none;
    border-radius: 5px;
    padding: 0.8rem;
    font-size: 16px;
    background: #3d2c8d;
    color: #fff;
    cursor: pointer;
    transition: all 0.4s ease;
    font-family: inherit;
  }

  .join-container button:hover {
    background: #1c0c5b;
  }

  .join-container button:active {
    transform: scale(0.99);
  }

  .hide {
    opacity: 0 !important;
  }
`;
export default App;
