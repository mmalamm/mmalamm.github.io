import React from "react";
import CardLogo from "./cardLogo";

const OpponentCards = ({ num }) => {
  const box = n => (
    <div className="opponentCards" key={n}>
      <CardLogo />
    </div>
  );
  const cards = [];
  for (let i = 0; i < num; i++) {
    cards.push(box(i));
  }
  return <div className="opponentCards__container">{cards}</div>;
};

export default OpponentCards;
