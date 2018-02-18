import createAiTurnPayload from "./ai_lib";

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
    this.getMatchStatus$.subscribe(d => this.processTracker(d));
  };
  processTracker = trkr => {
    window.setTimeout(() => {
      const cards = this.myCards$.getValue();
      if (trkr.currentPlayerName === this.name) {
        const payload = createAiTurnPayload(trkr, cards);
        const turn = { playerName: this.name, name: payload.name, payload };
        this.playTurn(turn);
      }
    }, 50);
  };
}
export default AiPlayer;
