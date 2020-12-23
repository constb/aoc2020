const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const cups = [...data].map(Number);
const steps = 10000000;

for (let i = Math.max(...cups) + 1; i <= 1000000; i++) {
  cups.push(i);
}
cups.forEach((v, i) => (cups[i] = { v }));
cups.forEach((v, i) => (cups[i].n = i < cups.length - 1 ? cups[i + 1] : cups[0]));

const vMap = new Map(cups.map((item) => [item.v, item]));

let head = cups[0];

for (let i = 0; i < steps; i++) {
  if (i % 1000 === 0) {
    process.stdout.write("  " + (i / (steps / 100)).toFixed(2) + "%\r");
  }

  const extract = [head.n.v, head.n.n.v, head.n.n.n.v];
  const extractHead = head.n;
  head.n = head.n.n.n.n;

  let cur = head.v - 1;
  while (true) {
    while (extract.includes(cur)) cur--;
    if (cur === 0) cur += cups.length;
    while (extract.includes(cur)) cur--;

    const pos = vMap.get(cur);
    if (pos) {
      extractHead.n.n.n = pos.n;
      pos.n = extractHead;
      break;
    }

    cur--;
  }

  head = head.n;
}

const posOne = vMap.get(1);
console.log("\n" + posOne.n.v * posOne.n.n.v);
