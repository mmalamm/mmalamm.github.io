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
    <div className="player-info" style={stilo}>
      {name[0]}
    </div>
  );
};

const PlayerInfo = props => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>{props.score}</div>
        <div>{renderIcon(props.name)}</div>
      </div>
      <div>{props.name}</div>
    </div>
  );
};

export default PlayerInfo;
