import React from "react";
import SmallCard from "./smallCard";

const Pass = <div style={{ fontSize: "3rem", color: "red" }}>过 PASS</div>;

const SmallTurnPanel = ({ turn }) => {
  const jsx = (() => {
    if (!turn) return <div style={{ fontSize: "2rem" }}>🤔 等候...</div>;
    const isPass = turn.payload._type === "PASS";
    if (isPass) {
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
                <SmallCard
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
  })();
  return <div style={{ height: "9rem" }}>{jsx}</div>;
};

export default SmallTurnPanel;
