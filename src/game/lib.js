import handChecker from './handChecker';
export const nextPlayer = (match, turn) => {
  const idx = (match.players.map(p => p.name).indexOf(turn.playerName) + 1) % 4;
  return match.players[idx];
};

export const matchUpdater = (match, turn) => {
  match.currentPlayer = nextPlayer(match, turn);
  match.turns = match.turns.concat([turn]);
  return trackerUpdater(match);
};

export const getRoundType = match => {
  const hand2beat = match.turns
    .slice(-3)
    .filter(({ payload: p }) => p._type === "PASS")
    .pop();
  return hand2beat ? hand2beat._type : null;
};

export const broadcast = (match, tracker) => {
  match.players.forEach(p => {
    p.update(tracker);
  });
};
export const getFirstPlayerName = match => {
  console.log(match);
  return match.players.filter(player => {
    return player.cards.find(card => card.suit === "Diamonds" && card.value === "Three");
  })[0].name;
}
export const initialBroadcast = (match, playTurn) => {
  let tracker = {
    last3Turns: [],
    currentPlayerName: "getFirstPlayerName(match)",
    roundType: null,
    cardsLeft: createCardsLeft(match)
  }
  match.players.forEach(p => {
    p.update(tracker);
    p.playTurn = playTurn;
  });
};

export const createCardsLeft = match => {
  const output = {};
  match.players.forEach(p => (output[p.name] = p.cards.length));
  return output;
};

export const trackerUpdater = match => {
  return {
    last3Turns: match.turns.slice(-3),
    currentPlayerName: match.currentPlayer.name,
    roundType: getRoundType(match),
    cardsLeft: createCardsLeft(match)
  };
};

export const isValidTurn = (match, turn) => {
  if (turn.payload._type === "PASS") return true;
  console.log(turn.payload);
  if (!handChecker(turn.payload.cards)) return false;
  const hand2beat = match.turns
    .slice(-3)
    .filter(({ payload: p }) => p._type === "PASS")
    .pop();
  if (!hand2beat) return true;
  return (
    hand2beat._type == turn.payload._type &&
    hand2beat._strength < turn.payload._strength
  );
};

export const isOver = match =>
  Boolean(match.players.filter(p => p.cards.length === 0).length);
