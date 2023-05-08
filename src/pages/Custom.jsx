import React, { useState, useEffect } from 'react';
import Button from '../components/Button';

const Custom = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = `http://localhost:5173/bb?roomCode=${inputValue}`;

  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit(event);
    }
  };

  return (
    <div>
      <header className="cwnr_header">
        <h1 className="top_middle">CWNR</h1>
      </header>
      <br/>

      <form onSubmit={handleSubmit}>
        <label className='input-label'>
          <span className='label-text'>
            Enter a room code for you and the other player to join:
          </span>
          <input type='text' value={inputValue} onChange={handleInputChange} className='input-box' onKeyDown={handleKeyDown}/>
          <br/>
          <Button text='JOIN' onClick={handleSubmit}/>
        </label>
        
      </form>
    </div>
  );
};

export default Custom;