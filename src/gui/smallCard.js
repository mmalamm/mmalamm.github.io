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
    backgroundColor: "#fdfdfd",
    border: ".01rem solid gray",
    borderRadius: ".2rem",
    padding: ".1rem",
    width: "2.5rem",
    boxShadow: "-.1rem .2rem 1rem gray",
    marginLeft: "-.5rem",
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
    <div style={styles}>
      <div style={{ textAlign: "center", width: "1.3rem" }}>
        <p style={unselectable}> {valsObj[props.value]}</p>
        <p style={unselectable}>{suitsObj[props.suit]}</p>
      </div>
    </div>
  );
};

export default SmallCard;
