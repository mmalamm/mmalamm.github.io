import React from "react";
import CardLogo from "./cardLogo";

const stilo = {
  backgroundColor: "#708090",
  padding: ".5rem",
  borderRadius: ".25rem",
  marginLeft: "-2rem",
  boxShadow: "-0.1rem 0.2rem 1rem black"
};

const OpponentCards = ({ num }) => {
  const box = n => (
    <div style={stilo} key={n}>
      <CardLogo />
    </div>
  );
  const cards = [];
  for (let i = 0; i <= num; i++) {
    cards.push(box(i));
  }
  return (
    <div
      style={{
        display: "flex",
        color: "blue",
        fontSize: "18",
        margin: "1rem 2rem"
      }}
    >
      {cards}
    </div>
  );
};

export default OpponentCards;
