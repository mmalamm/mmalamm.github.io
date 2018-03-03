import React from "react";
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const renderIcon = name => {
  const stilo = {
    backgroundColor: getRandomColor()
  };
  return (
    <div className="player-info__icon" style={stilo}>
      {name[0]}
    </div>
  );
};

const PlayerInfo = ({ name, score }) => {
  return (
    <div className="player-info">
      <div className="player-info__text">
        <div>{name}</div>
        <div>{score}</div>
      </div>
      <div>{renderIcon(name)}</div>
    </div>
  );
};

export default PlayerInfo;
