import { processTracker, createAiTurnPayload } from "./ai_lib";

class AiPlayer {
  constructor(user) {
    this.name = user;
    this.points = 100;
    this.ai = true;
  }
  registerMatch = (playTurn, getMatchStatus$, myCards$) => {
    this.playTurn = playTurn;
    this.myCards$ = myCards$;
    getMatchStatus$.subscribe(d =>
      processTracker(d, myCards$, this.name, playTurn)
    );
  };
}
export default AiPlayer;
