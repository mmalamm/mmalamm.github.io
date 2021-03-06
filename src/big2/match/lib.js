import handChecker from "../handChecker";

export const nextPlayer = (match, turn) => {
  const idx = (match.players.map(p => p.name).indexOf(turn.playerName) + 1) % 4;
  return match.players[idx];
};

export const diffCards = (hCs, tCs) => {
  const output = [];
  hCs.forEach(hC => {
    if (!tCs.some(tC => tC.suit === hC.suit && tC.value === hC.value)) {
      output.push(hC);
    }
  });
  return output;
};

export const isOver = trkr =>
  trkr.players.find(p => trkr.cardsLeft[p.name] === 0);

const createTurn2Beat = turns => {
  const t2b = turns
    .slice(-3)
    .filter(turn => turn.payload._type !== "PASS")
    .pop();
  return t2b ? t2b.payload.name : null;
};

const createCardsLeft = players =>
  players.reduce((a, p) => {
    a[p.name] = p.cards.length;
    return a;
  }, {});

export const createTracker = ({ players, currentPlayerName, turns }) => ({
  players: players.map(({ name }) => ({ name })),
  currentPlayerName,
  last3Turns: turns.slice(-3),
  cardsLeft: createCardsLeft(players),
  turn2Beat: createTurn2Beat(turns)
});

export const isValidTurn = (trkr, turn) => {
  if (!turn.playerName === trkr.currentPlayerName) return false;
  if (
    trkr.last3Turns.length === 0 &&
    !turn.payload.cards.find(c => c.suit === "Diamonds" && c.value === "Three")
  )
    return false;

  const turn2Beat = trkr.last3Turns
    .slice()
    .filter(({ payload: p }) => !(p._type === "PASS"))
    .pop();
  if (!turn2Beat && turn.payload._type === "PASS") return false;
  if (!turn2Beat) return true;
  if (turn.payload._type === "PASS") return true;
  if (!handChecker(turn.payload.cards)) return false;
  return (
    turn2Beat.payload._type == turn.payload._type &&
    turn2Beat.payload._strength < turn.payload._strength
  );
};

const createLostCards = state => {
  const losers = state.players.filter(p => p.cards.length);
  return losers.reduce((a, l) => {
    a[l.name] = l.cards;
    return a;
  }, {});
};

export const createEndStatus = (d, s) => {
  const winnerScore = d.players.reduce((a, p) => a + d.cardsLeft[p.name], 0);
  const result = d.players.reduce((a, b) => {
    const cL = d.cardsLeft[b.name];
    a[b.name] = cL ? -cL : winnerScore;
    return a;
  }, {});
  const { players } = d;
  const winningTurn = d.last3Turns.pop();
  return {
    winnerName: isOver(d).name,
    result,
    endState: {
      winningTurn,
      lostCards: createLostCards(s)
    }
  };
};
