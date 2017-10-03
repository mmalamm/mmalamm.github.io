import Card from './card';
const compRank = (a, b) => a.rank() - b.rank();

class Deck {
  constructor() {
    this.cards = [];
    let cardSuits = ['Diamonds', 'Clovers', 'Hearts', 'Spades'];
    let cardVals = [
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Jack',
      'Queen',
      'King',
      'Ace',
      'Two'
    ];
    let i = 0;
    cardVals.forEach(cardVal => {
      cardSuits.forEach(cardSuit => {
        let card = new Card(cardSuit, cardVal, i);
        this.cards.push(card);
        i++;
      });
    });
    this.shuffle();
  }

  shuffle() {
    const shuffler = arr => {
      for (let i = arr.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
      }
    };
    shuffler(this.cards);
    return this;
  }

  deal() {
    return this.shuffle().cards.slice().splice(0,13).sort(compRank);
  }
}

export default Deck;
