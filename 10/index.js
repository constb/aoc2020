let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data
  .split(/\n/)
  .map(Number)
  .sort((a, b) => a - b);

let input = [0, ...lines, lines[lines.length - 1] + 3];
let diffs = [0, 0, 0, 0];

for (let i = 0; i < input.length - 1; i++) {
  diffs[input[i + 1] - input[i]]++;
}

console.log(diffs[1] * diffs[3]);
