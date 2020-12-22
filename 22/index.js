const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const groups = data.split(/\n{2,}/).map((gr) => gr.split(/\n/).slice(1));
const p1 = groups[0].map(Number);
const p2 = groups[1].map(Number);

while (p1.length && p2.length) {
  const c1 = p1.shift();
  const c2 = p2.shift();
  if (c1 > c2) p1.push(c1, c2);
  else p2.push(c2, c1);
}

const winner = p1.length ? p1 : p2;
const result = winner.reduce((acc, v, idx) => acc + (winner.length - idx) * v, 0);

console.log(result);
