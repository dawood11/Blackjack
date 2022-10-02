import './Play.css';

import React, { useEffect, useState } from 'react';

import CardSet from '../Card/CardSet';
import { getRandomCard } from '../../Service/cardService';

const Play = ({ setStageModeToHomeScreen, playerName }) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  const [playerDeck, setPlayerDeck] = useState([getRandomCard(), getRandomCard()]);
  const [dealerDeck, setDealerDeck] = useState([getRandomCard()]);

  const [playerMessage, setPlayerMessage] = useState('');
  const [dealerMessage, setDealerMessage] = useState('');

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
    setTimeout(() => {
      if (disableBtns === true) {
        if (dealerScore === playerScore) {
          setPlayerMessage('Tie!');
          setDealerMessage('Tie!');
        } else if (dealerScore === 21) {
          setDealerMessage('The winner! 🏆');
          setPlayerMessage('Looser!');
        } else if (dealerScore > 21) {
          setDealerMessage('Looser!');
          setPlayerMessage('The winner! 🏆');
        } else if (playerScore > 21) {
          setDealerMessage('The winner! 🏆');
          setPlayerMessage('Looser!');
        } else if (dealerScore > playerScore) {
          setDealerMessage('The winner! 🏆');
          setPlayerMessage('Looser!');
        } else if (dealerScore < playerScore) {
          setDealerDeck((prevDeck) => [...prevDeck, getRandomCard()]);
        }
      }
    }, 500);
  }, [playerScore, dealerScore, disableBtns]);

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

  const handleStandBtn = () => {
    setDisableBtns(true);
  };

  const handleReset = () => {
    setStageModeToHomeScreen();
  };


  return (
    <div>
      <img src={'./Images/blackjack-logo.png'} alt='home-screen-logo' className='play_logo' />
      <h1>Velkommen {playerName}</h1>
      <CardSet roleName={'Dealer'} score={dealerScore} cardsInHand={dealerDeck} msg={dealerMessage} />
      <hr />
      <CardSet roleName={'Player'} score={playerScore} cardsInHand={playerDeck} msg={playerMessage} />
      <button disabled={disableBtns} onClick={() => setPlayerDeck((prevDeck) => [...prevDeck, getRandomCard()])}>
        Hit
      </button>
      <button disabled={disableBtns} onClick={handleStandBtn}>Stand</button>
      <br />
      <button onClick={handleReset}>Go back to start</button>
    </div>
  );
};

export default Play;
