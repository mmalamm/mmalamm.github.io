import React from "react";
import TurnPanel from "../common/turnPanel.js";
import PlayerInfo from "../common/playerInfo.js";
import SmallCard from "../common/smallCard";
const renderCardsLeft = (obj, score) => {
  const stilo = { display: "flex", marginLeft: "1rem", height: "4rem" };
  const cardsLeftJSX = [];
  for (let loser in obj) {
    const item = (
      <div key={loser} style={{ display: "flex" }}>
        <PlayerInfo name={loser} score={score[loser]} />
        <div style={stilo}>
          {obj[loser].map(card => {
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
          {createResult(-obj[loser].length)}
        </div>
      </div>
    );
    cardsLeftJSX.push(item);
  }
  return cardsLeftJSX;
};
const createResult = num => {
  const winner = num > 0;
  const stilo = {
    height: "2rem",
    fontSize: winner ? "2.5rem" : "1.5rem",
    color: winner ? "green" : "red"
  };
  return <div style={stilo}>{num > 0 ? "+" + num : num}</div>;
};

const EndScreen = ({ histObj, scoreObj }) => {
  return (
    <div>
      <div>
        <h1>{histObj.winnerName} wins!</h1>
        <TurnPanel turn={histObj.endState.winningTurn} />
        <PlayerInfo
          name={histObj.winnerName}
          score={scoreObj[histObj.winnerName]}
        />
        {createResult(histObj.result[histObj.winnerName])}
      </div>
      <div>
        <h3>Remaining Cards:</h3>
        {renderCardsLeft(histObj.endState.lostCards, scoreObj)}
      </div>
    </div>
  );
};

export default EndScreen;
