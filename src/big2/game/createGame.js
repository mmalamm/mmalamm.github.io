const createGame = players => {
  const score = players.reduce((a, b) => {
    a[b.name] = 100;
    return a;
  }, {})
  const GAME_INIT_STATE = {
    score,
    history: []
  }
  const gameReducer = (state = GAME_INIT_STATE, action) => {
    switch (action.type) {
      case PROCESS_MATCH:
        
        return 
    }
  }
}