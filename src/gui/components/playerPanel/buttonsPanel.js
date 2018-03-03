import React from "react";

const ButtonsPanel = ({ disablePlay, disablePass, playTurn, passTurn }) => {
  return (
    <div className="buttons">
      <button disabled={disablePlay} onClick={playTurn}>
        出牌 PLAY
      </button>
      <button disabled={disablePass} onClick={passTurn}>
        过 PASS
      </button>
    </div>
  );
};

export default ButtonsPanel;
