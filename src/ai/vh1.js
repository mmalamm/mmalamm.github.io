import handChecker from "../game/handChecker";
const combine = (a, min) => {
  const fn = (n, src, got, all) => {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (let j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  };
  const all = [];
  for (let i = min; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  const hands = all
    .filter(set => set.length <= 5 && set.length !== 4)
    .filter(set => handChecker(set))
    .map(set => handChecker(set));
  return hands
};

const validHands = cards => combine(cards, 1);

export default validHands;
