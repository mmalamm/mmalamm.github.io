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

const createTurn2Beat = turns => {
  const t2b = turns
    .slice(-3)
    .filter(turn => turn.payload._type !== "PASS")
    .pop()
  return t2b ? t2b.payload.name : null;
}

export const createTracker = ({ players, currentPlayerName, turns }) => ({
  players: players.map(({ name, points }) => ({ name, points })),
  currentPlayerName,
  last3Turns: turns.slice(-3),
  turn2Beat: createTurn2Beat(turns)
});

export const isValidTurn = (trkr, turn) => {
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
  const output =
    turn2Beat.payload._type == turn.payload._type &&
    turn2Beat.payload._strength < turn.payload._strength;
  return output;
};

///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////

export const isOver = match =>
  Boolean(match.players.filter(p => p.cards.length === 0).length);

export const createResult = match => {
  const winnerScore = match.players
    .map(p => p.cards.length)
    .reduce((a, b) => a + b);
  const output = {};
  match.players.forEach(
    p => (output[p.name] = p.cards.length ? p.cards.length * -1 : winnerScore)
  );
  return output;
};
