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
  const styles = {
    color:
      props.suit === "Diamonds" || props.suit === "Hearts"
        ? "#b30000"
        : "#2f2f2f",
    marginTop: props.selected ? "0rem" : "1rem"
  };
  return (
    <div className="card" style={styles}>
      <div className="cardTextContainer">
        <p className="unselectable__big">{valsObj[props.value]}</p>
        <p className="unselectable__big">{suitsObj[props.suit]}</p>
      </div>
    </div>
  );
};

export default Card;
