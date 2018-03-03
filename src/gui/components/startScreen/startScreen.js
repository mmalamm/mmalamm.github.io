import React from "react";
const StartScreen = props => {
  const { playMatch } = props;
  return (
    <div className="startButton" onClick={playMatch}>
      打比赛 Play Match
    </div>
  );
};

export default StartScreen;
