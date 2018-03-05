import React from "react";

const valsObj = {
  Three: "3",
  Four: "4",
  Five: "5",
  Six: "6",
  Seven: "7",
  Eight: "8",
  Nine: "9",
  Ten: "10",
  Jack: "J",
  Queen: "Q",
  King: "K",
  Ace: "A",
  Two: "2"
};

const suitsObj = {
  Spades: "♠",
  Hearts: "♥",
  Clovers: "♣",
  Diamonds: "♦"
};

const Card = props => {
  const colorClass =
    props.suit === "Diamonds" || props.suit === "Hearts"
      ? " redSuit"
      : " blkSuit";
  const selected = props.selected ? " selected" : "";
  const clss = `card${selected}${colorClass}`;
  return (
    <div className={clss}>
      <div className="cardTextContainer">
        <p className="unselectable__big">{valsObj[props.value]}</p>
        <p className="unselectable__big">{suitsObj[props.suit]}</p>
      </div>
    </div>
  );
};

export default Card;
