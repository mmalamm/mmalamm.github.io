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

const none = "none";
const unselectable = {
  MozUserSelect: none,
  WebkitUserSelect: none,
  msUserSelect: none,
  pointerEvents: none,
  marginLeft: "1rem"
};

const Card = props => {
  const styles = {
    backgroundColor: "#fdfdfd",
    border: ".01rem solid gray",
    margin: ".2rem",
    marginLeft: "-1rem",
    borderRadius: ".3rem",
    width: "4rem",
    boxShadow: "-.1rem .2rem 1rem gray",
    cursor: "pointer",
    zIndex: "-1",
    color:
      props.suit === "Diamonds" || props.suit === "Hearts"
        ? "#b30000"
        : "#2f2f2f",
    marginTop: props.selected ? "0rem" : "1rem"
  };
  return (
    <div style={styles}>
      <p style={unselectable}>{valsObj[props.value]}</p>
      <p style={unselectable}>{suitsObj[props.suit]}</p>
    </div>
  );
};

export default Card;
