import './Card.css';

import Card from './Card';
import React from 'react';

const CardSet = ({roleName, score, cardsInHand, msg}) => {
  return (
    <div>
      <h2>{roleName}({score}) {msg}</h2>
      <div className='cardContainer'>
        {cardsInHand.length > 0 && cardsInHand.map((cardItem, index) => <Card key={index} card={cardItem} />)}
      </div>
    </div>
  );
};

export default CardSet;
