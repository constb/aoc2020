const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const groups = data.split(/\n{2,}/).map((gr) => gr.split(/\n/).slice(1));
const p1 = groups[0].map(Number);
const p2 = groups[1].map(Number);

function play(p1, p2) {
  const seen = new Set();

  while (p1.length && p2.length) {
    const roundKey = p1.join(",") + "|" + p2.join(",");
    if (seen.has(roundKey)) return [p1, 1];
    else seen.add(roundKey);

    const c1 = p1.shift();
    const c2 = p2.shift();

    if (c1 <= p1.length && c2 <= p2.length) {
      const [, recursionWinner] = play(p1.slice(0, c1), p2.slice(0, c2));
      if (recursionWinner === 1) p1.push(c1, c2);
      else p2.push(c2, c1);
    } else if (c1 > c2) p1.push(c1, c2);
    else p2.push(c2, c1);
  }

  if (p1.length === 0) return [p2, 2];
  else return [p1, 1];
}

const [winner] = play(p1, p2);
const result = winner.reduce((acc, v, idx) => acc + (winner.length - idx) * v, 0);

console.log(result);
