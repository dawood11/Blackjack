import React from 'react';
import { highScoreList } from '../../Service/localStorageKeys';

const Highscore = ({ setStageModeToHomeScreen }) => {
  const highScoreListData = JSON.parse(localStorage.getItem(highScoreList));

  return (
    <div>
      <h1>Highscore</h1>
      {
        highScoreListData === null
          ? <p>No highscore recorded yet...</p>
          : <React.Fragment>
            {
              highScoreListData
                .filter((e, i) => (i < 10))
                .map((scoreData, index) => <p key={index}>
                  {scoreData.name} - {scoreData.score}
                </p>)
            }
          </React.Fragment>
      }
      <button onClick={() => setStageModeToHomeScreen()}>Home</button>
    </div>
  );
};

export default Highscore;
