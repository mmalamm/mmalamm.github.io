import React from 'react';

const valsObj = {
  'Three': '3',
  'Four': '4',
  'Five': '5',
  'Six': '6',
  'Seven': '7',
  'Eight': '8',
  'Nine': '9',
  'Ten': '10',
  'Jack': 'J',
  'Queen': 'Q',
  'King': 'K',
  'Ace': 'A',
  'Two': '2'
};

const suitsObj = {
  'Spades': '♠',
  'Hearts': '♥',
  'Clovers': '♣',
  'Diamonds': '♦'
};

const Card = props => {

  let styles = {
    color: props.suit === 'Diamonds' ||
      props.suit === 'Hearts' ?
      'red':
      'black',
    marginTop: props.selected ? '0rem':'1rem'
  };
  let none = 'none';
  let unselectable = {
    MozUserSelect: none,
    WebkitUserSelect: none,
    msUserSelect: none,
    pointerEvents: none,
    marginLeft: '1rem'
  };
  return (
    <div style={styles}
      className="card">
      <p style={unselectable}>
        {valsObj[props.value]}
      </p>
      <p style={unselectable}>
        {suitsObj[props.suit]}
      </p>
    </div>

  );

};

export default Card;
