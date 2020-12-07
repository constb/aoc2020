const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const lines = data.split(/\n/);

const rules = {};
lines.forEach((line) => {
  const re1 = /(\w+ \w+) bags contain/;
  const re2 = /(\d+) (\w+ \w+) bags?/g;
  let match = re1.exec(line);
  const current = match[1];
  rules[current] = [];

  const children = line.substr(match[0].length);
  while ((match = re2.exec(children))) {
    rules[current].push([match[2], +match[1]]);
  }
});

function getFor(type) {
  let count = 0;
  if (rules[type] && rules[type].length > 0) {
    rules[type].forEach(([t, num]) => {
      count += num + getFor(t) * num;
    });
  }
  return count;
}

console.log(getFor("shiny gold"));
