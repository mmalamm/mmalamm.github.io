import React from "react";
import Card from "./card";

const TurnPanel = ({ turn }) => {
  if (!turn) return <div>等候...</div>;
  const isPass = turn.payload._type === "PASS";
  if (isPass) {
    const Pass = <div>过 PASS</div>;
    return Pass;
  } else {
    const validSubmit = turn.payload;
    return (
      <form>
        {validSubmit.cards.map(card => {
          let uniqKey = Date.now().toString() + card._rank;
          let selectionState = false;
          return (
            <div key={uniqKey}>
              <Card
                selected={selectionState}
                value={card.value}
                suit={card.suit}
              />
            </div>
          );
        })}
      </form>
    );
  }
};

export default TurnPanel;
