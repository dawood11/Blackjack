import React from 'react';

const Highscore = ({ setStageModeToHomeScreen }) => {
  return (
    <div>
      <h1>Highscore</h1>
      <button onClick={() => setStageModeToHomeScreen()}>Home</button>
    </div>
  );
};

export default Highscore;
