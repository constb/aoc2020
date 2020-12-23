const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let cups = [...data].map(Number);

for (let i = 0; i < 100; i++) {
  const extract = cups.slice(1, 4);
  const remaining = [cups[0]].concat(cups.slice(4));

  let cur = cups[0] - 1;
  while (true) {
    if (cur === 0) cur += cups.length;

    const pos = remaining.indexOf(cur);
    if (pos !== -1) {
      cups = remaining
        .slice(0, pos + 1)
        .concat(extract)
        .concat(remaining.slice(pos + 1));
      break;
    }

    cur--;
  }

  cups.push(cups.shift());
}

let res = cups.concat(cups);
res = res.slice(res.indexOf(1) + 1, res.indexOf(1) + cups.length);
console.log(res.join(""));
