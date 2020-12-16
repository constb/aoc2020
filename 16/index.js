const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const groups = data.split(/\n{2,}/);

const rules = {};

groups[0].split(/\n/).forEach((rule) => {
  let [name, ranges] = rule.split(":");
  [name, ranges] = [name.trim(), ranges.split(/ or /)];
  rules[name] = rules[name] || [];
  ranges.forEach((range) => {
    rules[name].push(range.split("-").map((x) => +x.trim()));
  });
});
const rulesAll = Object.values(rules);

const tickets = groups[2].split(/\n/);

let sum = 0;
for (let i = 1; i < tickets.length; i++) {
  const values = tickets[i].split(",").map(Number);
  values.forEach((value) => {
    if (!rulesAll.some((ranges) => ranges.some(([low, high]) => value >= low && value <= high))) {
      sum += value;
    }
  });
}

console.log(sum);
