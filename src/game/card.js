class Card {
  constructor(suit, value, rank, ord) {
    this.suit = suit;
    this.value = value;
    this.rank = () => {
      return rank;
    };
    return Object.freeze({
      suit,
      value,
      rank: this.rank,
      ord
    });
  }
}

export default Card;
