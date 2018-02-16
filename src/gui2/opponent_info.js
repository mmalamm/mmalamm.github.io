import PlayerInfo from "./player_info";
import React from "react";

const OpponentCards = ({ num }) => {
  const box = "牌 ▋";
  return (
    <div>
      {box} x {num}
    </div>
  );
};

const OpponentInfo = props => {
  return (
    <div>
      <div>
        <OpponentCards num={props.numCardsLeft} />
      </div>
      <div>
        <PlayerInfo name={props.name} score={props.score} />
      </div>
    </div>
  );
};

export default OpponentInfo;
