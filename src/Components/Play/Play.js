import './Play.css';

import React, { useEffect, useState } from 'react';
import { currentPlayerScore, highScoreList } from '../../Service/localStorageKeys';

import CardSet from '../Card/CardSet';
import { getRandomCard } from '../../Service/cardService';

const Play = ({ setStageModeToHomeScreen, playerName }) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  const [playerDeck, setPlayerDeck] = useState([getRandomCard(), getRandomCard()]);
  const [dealerDeck, setDealerDeck] = useState([getRandomCard()]);

  const [playerMessage, setPlayerMessage] = useState('');
  const [dealerMessage, setDealerMessage] = useState('');

  const [roundState, setRoundState] = useState({
    won: false,
    tie: false,
    lost: false,
  });
  const [disableBtns, setDisableBtns] = useState(false);


  useEffect(() => {
    calculateScore(playerDeck, setPlayerScore);
  }, [playerDeck]);

  useEffect(() => {
    calculateScore(dealerDeck, setDealerScore);
  }, [dealerDeck]);

  useEffect(() => {
    if (playerScore > 21 || playerScore === 21) {
      setDisableBtns(true);
    }
  }, [playerScore]);

  useEffect(() => {
    const tieMsg = 'Tie!';
    const winnerMsg = 'The winner! 🏆';
    const looserMsg = 'Looser!';

    setTimeout(() => {
      if (disableBtns === true) {
        if (dealerScore === playerScore) {
          setDealerMessage(tieMsg);
          setPlayerMessage(tieMsg);
          setRoundState({ won: false, tie: true, lost: false });
          // } else if (dealerScore === 21) {
          //   setDealerMessage(winnerMsg);
          //   setPlayerMessage(looserMsg);
          //   setRoundState({won: false, tie: false, lost: true });
        } else if (dealerScore > 21) {
          setDealerMessage(looserMsg);
          setPlayerMessage(winnerMsg);
          setRoundState({ won: true, tie: false, lost: false });
        } else if (playerScore > 21 || dealerScore > playerScore || dealerScore === 21) {
          setDealerMessage(winnerMsg);
          setPlayerMessage(looserMsg);
          setRoundState({ won: false, tie: false, lost: true });
        } else if (dealerScore < playerScore) {
          setDealerDeck((prevDeck) => [...prevDeck, getRandomCard()]);
        } else {
        }
      }
    }, 500);
  }, [playerScore, dealerScore, disableBtns]);

  useEffect(() => {
    const currentOverallScore = localStorage.getItem(currentPlayerScore);

    if (roundState.won === true) {
      if (currentOverallScore === null) {
        localStorage.setItem(currentPlayerScore, playerScore);
      } else {
        localStorage.setItem(currentPlayerScore, parseInt(currentOverallScore) + playerScore);
      }
    }

    if (roundState.lost === true) {
      const highScoreListData = localStorage.getItem(highScoreList);
      if (currentOverallScore !== null) {
        if (highScoreListData === null) {
          localStorage.setItem(highScoreList, JSON.stringify([{ name: playerName, score: currentOverallScore }]));
        } else {
          const newHighScoreList = JSON.parse(highScoreListData);
          newHighScoreList.push({ name: playerName, score: currentOverallScore });
          newHighScoreList.sort((a, b) => b.score - a.score)
          localStorage.setItem(highScoreList, JSON.stringify(newHighScoreList));
        }
      }
      localStorage.removeItem(currentPlayerScore);
    }
  }, [roundState, playerName, playerScore]);

  const calculateScore = (deck, setScore) => {
    let score = 0;

    deck.forEach((card) => {
      score += card.value;
    });

    if (score > 21) {
      deck.forEach((card) => {
        if (score > 21 && card.value === 11) {
          score = score - 10;
        }
      });
    }
    setScore(score);
  };

  const handleNextRound = () => {
    setDealerDeck([getRandomCard()]);
    setPlayerDeck([getRandomCard(), getRandomCard()]);
    setRoundState({
      won: false,
      tie: false,
      lost: false,
    });
    setDealerMessage('');
    setPlayerMessage('');

    setDisableBtns(false);
  };


  return (
    <div>
      <img src={'./Images/blackjack-logo.png'} alt='home-screen-logo' className='play_logo' />
      <CardSet roleName={'Dealer'} score={dealerScore} cardsInHand={dealerDeck} msg={dealerMessage} />
      <hr />
      <CardSet roleName={'Player'} score={playerScore} cardsInHand={playerDeck} msg={playerMessage} />
      <button disabled={disableBtns} onClick={() => setPlayerDeck((prevDeck) => [...prevDeck, getRandomCard()])}>
        Hit
      </button>
      <button disabled={disableBtns} onClick={() => setDisableBtns(true)}>Stand</button>
      <br />
      {
        (roundState.won === true || roundState.tie === true)
        && <button onClick={handleNextRound}>Next round</button>
      }
      {
        (roundState.lost === true)
        && <button onClick={() => setStageModeToHomeScreen()}>Go back to start</button>
      }
    </div>
  );
};

export default Play;
