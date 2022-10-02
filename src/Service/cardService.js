import deckOfCards from './deckOfCards';

export const getRandomCard = () => {
  return deckOfCards[Math.floor(Math.random() * deckOfCards.length)];
};

export const checkIfCardInDeck = (deck, card) => {
  let exists = false;

  deck.forEach((cardInDeck) => {
    console.log(cardInDeck.name, cardInDeck.suit, ' --- ', card.name, card.suit);
    if (cardInDeck.name === card.name && cardInDeck.suit === card.suit) {
      exists = true;
    }
  });

  return exists;
};