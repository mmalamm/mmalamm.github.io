import validHands from "./vh1";
import { validateTurn } from "../gui/lib";
import handChecker from "../game/handChecker";
class AiPlayer {
  constructor(user) {
    this.name = user;
    this.points = 100;
    this.ai = true;
  }

  registerMatch = (playTurn, getMatchStatus$, myCards$) => {
    this.playTurn = playTurn;
    this.getMatchStatus$ = getMatchStatus$;
    this.myCards$ = myCards$;

    /// do cool decision making here
  };
}

export default AiPlayer;
