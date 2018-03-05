import React from "react";
import Card from "./cardComponent";

const Pass = <div style={{ fontSize: "3rem", color: "red" }}>过 PASS</div>;

const TurnPanel = ({ turn }) => {
  const jsx = (() => {
    if (!turn) return <div style={{ fontSize: "2rem" }}>🤔 等候...</div>;
    const isPass = turn.payload._type === "PASS";
    if (isPass) {
      return Pass;
    } else {
      const validSubmit = turn.payload;
      return (
        <div className="turnPanel">
          {validSubmit.cards.map(card => {
            let uniqKey = Date.now().toString() + card._rank;
            let selectionState = false;
            return (
              <div key={uniqKey} className="turnPanel__cardContainer">
                <Card
                  selected={selectionState}
                  value={card.value}
                  suit={card.suit}
                />
              </div>
            );
          })}
        </div>
      );
    }
  })();
  return jsx;
};

export default TurnPanel;
