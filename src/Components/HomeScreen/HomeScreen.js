import React from 'react';

const HomeScreen = ({ stageMode, setStageMode, playerName, setPlayerName }) => {
  return (
    <div>
      <img src={'./Images/blackjack-logo.png'} alt='home-screen-logo' className='logo' />
      <h2>Enter player name</h2>
      <input type={'text'} autoFocus value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
      <button
        disabled={playerName === ''}
        onClick={() => setStageMode({ ...stageMode, homeScreen: false, play: true })}
      >
        Lets play
      </button>
      <button
        onClick={() => setStageMode({ ...stageMode, homeScreen: false, highscore: true })}
      >
        Highscore
      </button>
    </div>
  );
};

export default HomeScreen;
