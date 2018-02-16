import React from "react";
import Card from "./card";

const TurnPanel = ({ turn }) => {
  const validSubmit = turn.payload;
  const Pass = <div>PASS</div>;
  const isPass = turn.payload._typs === "PASS";
  return isPass ? (
    Pass
  ) : (
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
};

export default TurnPanel;
