/* 
PlayerInfo
-name (gameStatus$)
-score (gameStatus$)
-img (gameStatus$)
*/


/*
OpponentInfo 
-number of cards left (matchStatus$)
=PlayerInfo

TurnPanel
-player (matcStatus$.last3Turns)
-cards (matcStatus$.last3Turns)

MyCards
-array of cards (player.myCards$)

PlayerPanel
=MyCards
-Pass/Play panel (player.playturn)

//////////////////////////////
getGameStatus$ = {
  playerNames: players.map(p => p.name),
  score,
  history: [],
  matchInProgress: false
}

matchStatus$ = {
  players: players.map(({ name, points }) => ({ name, points })),
  currentPlayerName,
  last3Turns: turns[{playerName, name, payload}]
  cardsLeft: obj
  turn2Beat: string
}

myCards$ = cards[{suit, value, _rank, ord}]
*/

