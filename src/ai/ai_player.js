import validHands from "./vh1";
import { validateTurn } from "../gui/lib";
import handChecker from "../big2/handChecker";
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
const has3Dice = cards =>
  cards.find(c => c.value === "Three" && c.suit === "Diamonds");
const createAiTurnPayload = (trkr, cards) => {
  const myHands = validHands(cards).sort((a, b) => a._strength - b._strength);
  if (has3Dice(cards)) {
    return myHands.filter(h => has3Dice(h.cards)).pop();
  }
  const hand2Beat = getHand2Beat(trkr);
  const roundType = getRoundType(trkr);
  if (hand2Beat) {
    const nextLowestHand = myHands
      .filter(h => h._type === roundType)
      .filter(h => h._strength > hand2Beat._strength)
      .shift();
    return nextLowestHand ? nextLowestHand : handChecker("PASS");
  } else {
    const comboCheck = myHands
      .slice()
      .filter(h => h._type === "Combo")
      .shift();
    if (comboCheck) return comboCheck;
    const tripleCheck = myHands
      .slice()
      .filter(h => h._type === "Triple")
      .shift();
    if (tripleCheck) return tripleCheck;
    const notSingleCheck = myHands
      .slice()
      .filter(h => h._type !== "Single")
      .shift();
    if (notSingleCheck) return notSingleCheck;
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
    window.setTimeout(() => {
      const cards = this.myCards$.getValue();
      if (trkr.currentPlayerName === this.name) {
        const payload = createAiTurnPayload(trkr, cards);
        const turn = { playerName: this.name, name: payload.name, payload };
        this.playTurn(turn);
      }
    }, 500);
  };
}
export default AiPlayer;
