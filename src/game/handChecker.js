const compRank = (a, b) => a._rank - b._rank;
const maxRank = cards =>
  cards
    .slice()
    .sort(compRank)
    .pop()
    ._rank;
import uniq from "lodash/uniq";
import isEqual from "lodash/isEqual";
const _ = {
  uniq,
  isEqual
};

class Hand {
  constructor(type, cards, strength, name) {
    this.name = name;
    this.cards = cards;
    this._type = type;
    this._strength = strength;
  }
}

const handChecker = userInput => {
  if (userInput === "PASS") return new Hand("PASS", [], -1, "PASS");
  const arr = userInput.slice().sort(compRank),
    vals = arr
      .slice()
      .sort(compRank)
      .map(c => c.value),
    uniqs = _.uniq(vals);
  let str, name;
  switch (arr.length) {
    case 1:
      str = arr[0]._rank;
      name = `${arr[0].value} of ${arr[0].suit}`;
      return new Hand("Single", arr, 100 + str, name);
    case 2:
      if (uniqs.length !== 1) return null;
      str = maxRank(arr);
      name = `Double ${arr[0].value}`;
      return new Hand("Double", arr, 200 + str, name);
    case 3:
      if (uniqs.length !== 1) return null;
      str = maxRank(arr);
      name = `Triple ${arr[0].value}`;
      return new Hand("Triple", arr, 300 + str, name);
    case 5:
      const comboChecker = (() => {
        const isStraight = (input => {
            if (uniqs.length !== 5) return false;
            let checker = [
              "Ace",
              "Two",
              "Three",
              "Four",
              "Five",
              "Six",
              "Seven",
              "Eight",
              "Nine",
              "Ten",
              "Jack",
              "Queen",
              "King",
              "Ace",
              "Two"
            ];
            let ords = input.sort((a, b) => a.ord - b.ord).map(c => c.value);
            let i = checker.indexOf(uniqs[0]);
            let j = checker.indexOf(ords[0]);
            return (
              _.isEqual(uniqs, checker.slice(i, i + 5)) ||
              _.isEqual(ords, checker.slice(j, j + 5))
            );
          })(arr),
          isFlush = _.uniq(arr.map(c => c.suit)).length === 1,
          isRoyalFlush = isFlush && isStraight;
        if (isRoyalFlush) {
          let str = maxRank(arr);
          return {
            strength: str + 800,
            name: "Royal Flush"
          };
        }
        if (isFlush) {
          let str = maxRank(arr);
          return {
            strength: str + 500,
            name: `Flush of ${arr[0].suit}`
          };
        }
        if (isStraight) {
          let mainCard = arr.filter(c => c._rank === maxRank(arr))[0];
          let str = mainCard._rank;
          return {
            strength: str + 400,
            name: `Straight to ${mainCard.value} of ${mainCard.suit}`
          };
        }
        const countChecker = (val, qty) =>
          arr.filter(c => c.value === val).length === qty;
        const isHouse = (input => {
          let twoVals = uniqs.length === 2;
          let hasTrip = countChecker(uniqs[0], 3) || countChecker(uniqs[1], 3);
          let hasDub = countChecker(uniqs[0], 2) || countChecker(uniqs[1], 2);
          return twoVals && hasTrip && hasDub;
        })(arr);
        if (isHouse) {
          let trip = countChecker(uniqs[0], 3) ? uniqs[0] : uniqs[1];
          let str = maxRank(arr.filter(c => c.value === trip));
          return {
            strength: str + 600,
            name: `House of ${trip}`
          };
        }
        const isBomb = (input => {
          let twoVals = uniqs.length === 2;
          let hasQuad = countChecker(uniqs[0], 4) || countChecker(uniqs[1], 4);
          return twoVals && hasQuad;
        })(arr);
        if (isBomb) {
          let quad = countChecker(uniqs[0], 4) ? uniqs[0] : uniqs[1];
          let str = maxRank(arr.filter(c => c.value === quad));
          return {
            strength: str + 700,
            name: `Bomb of ${quad}`
          };
        }
        return null;
      })();
      if (!comboChecker) return null;
      str = comboChecker.strength;
      name = comboChecker.name;
      return new Hand("Combo", arr, str, name);
    default:
      return null;
  }
};

export default handChecker;
