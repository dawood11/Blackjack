import './Card.css';

import React from 'react';

const Card = ({ card }) => {
  return (
    <div className='card'>
      <img src={card.imgPath} alt={'card-' + card.imgPath} className='card' />
    </div>
  );
};

export default Card;
