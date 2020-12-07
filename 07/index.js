const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const lines = data.split(/\n/);

const rules = {};
lines.forEach((line) => {
  const re1 = /(\w+ \w+) bags contain/;
  const re2 = /\d+ (\w+ \w+) bags?/g;
  let match = re1.exec(line);
  const current = match[1];
  rules[current] = [];

  const children = line.substr(match[0].length);
  while ((match = re2.exec(children))) {
    rules[current].push(match[1]);
  }
});

let lookup = ["shiny gold"];
let result = new Set();

let lookupNext = [];
do {
  lookupNext = [];
  for (const y of lookup) {
    for (const x of Object.keys(rules)) {
      if (x !== y && rules[x].includes(y)) {
        lookupNext.push(x);
        result.add(x);
      }
    }
  }
  lookup = lookupNext;
} while (lookupNext.length > 0);

console.log(result.size);
