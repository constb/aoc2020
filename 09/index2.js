let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.split(/\n/).map(Number);

const range = 25;
let f;

for (let x = range; x < lines.length; x++) {
  const test = lines.slice(x - range, x).sort((a, b) => a - b);
  while (test.length >= 2) {
    if (test[0] + test[test.length - 1] === lines[x]) break;
    if (test[0] + test[test.length - 1] < lines[x]) test.shift();
    if (test[0] + test[test.length - 1] > lines[x]) test.pop();
  }
  if (test.length < 2) {
    f = lines[x];
    break;
  }
}

const window = [0, 1];

while (window[1] < lines.length) {
  const slice = lines.slice(...window);
  const sum = slice.reduce((a, v) => a + v, 0);
  if (sum === f) return console.log(Math.min(...slice) + Math.max(...slice));
  if (sum < f) window[1]++;
  if (sum > f) window[0]++;
  if (window[1] === window[0]) window[1]++;
}
