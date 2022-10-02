import './App.css';

import { useEffect, useState } from 'react';

import Highscore from './Components/Highscore/Highscore';
import HomeScreen from './Components/HomeScreen/HomeScreen';
import Play from './Components/Play/Play';

const App = () => {
  const [playerName, setPlayerName] = useState('DDDD');
  const [stageMode, setStageMode] = useState({
    homeScreen: true,
    play: false,
    highscore: false,
  });

  useEffect(() => {
    console.log(playerName);
  }, [playerName]);

  return (
    <div className='App'>
      {stageMode.homeScreen && <HomeScreen stageMode={stageMode} setStageMode={setStageMode} playerName={playerName} setPlayerName={setPlayerName} />}
      {stageMode.play && <Play setStageModeToHomeScreen={() => setStageMode({ ...stageMode, homeScreen: true, play: false })} playerName={playerName} />}
      {stageMode.highscore && <Highscore setStageModeToHomeScreen={() => setStageMode({ ...stageMode, homeScreen: true, highscore: false })} />}
    </div>
  );
}

export default App;
