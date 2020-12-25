const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const lines = data.split(/\n/).map(Number);

const min = Math.min(...lines);
const max = Math.max(...lines);

let i, j, val;
for (val = 7, i = 1; val !== min; i++) {
  val = (val * 7) % 20201227;
}
let key = max;
for (j = 1; j < i; j++) {
  key = (key * max) % 20201227;
}
console.log(key);
