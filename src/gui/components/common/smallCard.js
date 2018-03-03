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

const SmallCard = props => {
  const styles = {
    color:
      props.suit === "Diamonds" || props.suit === "Hearts"
        ? "#b30000"
        : "#2f2f2f"
  };
  const none = "none";
  const unselectable = {
    MozUserSelect: none,
    WebkitUserSelect: none,
    msUserSelect: none,
    pointerEvents: none,
    margin: ".2rem",
    lineHeight: "1rem"
  };
  return (
    <div className="smallCard" style={styles}>
      <div className="smallCardTextContainer">
        <p className="unselectable__small">{valsObj[props.value]}</p>
        <p className="unselectable__small">{suitsObj[props.suit]}</p>
      </div>
    </div>
  );
};

export default SmallCard;
