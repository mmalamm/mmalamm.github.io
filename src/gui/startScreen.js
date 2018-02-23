import React from "react";
const StartScreen = props => {
  const { playMatch } = props;
  return <button onClick={playMatch}>打比赛 Play Match</button>;
};

export default StartScreen;
