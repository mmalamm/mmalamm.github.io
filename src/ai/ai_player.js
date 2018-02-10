import validHands from "./vh1";
import { validateTurn } from "../gui/lib";
import handChecker from "../game/handChecker";
const getRoundType = tracker => {
  const turn2Beat = tracker.last3Turns
    .filter(turn => turn.payload._type !== "PASS")
    .pop();
  return turn2Beat ? turn2Beat.payload._type : null;
};
const getHand2Beat = tracker => {
  const turn2Beat = tracker.last3Turns
    .filter(turn => turn.payload._type !== "PASS")
    .pop();
  return turn2Beat ? turn2Beat.payload : null;
};
const createAiTurnPayload = (trkr, cards) => {
  const hand2Beat = getHand2Beat(trkr);
  const myHands = validHands(cards).sort((a, b) => a._strength - b._strength);
  const roundType = getRoundType(trkr);
  if (hand2Beat) {
    const nextLowestHand = myHands
      .filter(h => h._type === roundType)
      .filter(h => h._strength > hand2Beat._strength)
      .shift();
    return nextLowestHand ? nextLowestHand : handChecker("PASS");
  } else {
    const comboCheck = myHands.filter(h => h._type !== "Single").shift();
    if (comboCheck) return comboCheck;
    return myHands.shift();
  }
};
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
    const cards = this.myCards$.getValue();
    if (trkr.currentPlayerName === this.name) {
      const payload = createAiTurnPayload(trkr, cards);
      const turn = { playerName: this.name, name: payload.name, payload };
      this.playTurn(turn);
    }
  };
}
export default AiPlayer;
