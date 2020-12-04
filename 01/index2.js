const fs = require("fs");
const readline = require("readline");

const source = Array.from({ length: 2021 }, () => 0);

(async function () {
  const rl = readline.createInterface({ input: fs.createReadStream("input.txt") });

  for await (let line of rl) {
    line = line.trim();
    if (line.length > 0) {
      const n = parseInt(line, 10);
      if (Number.isFinite(n) && n >= 0 && n <= 2020) {
        source[n]++;
      }
    }
  }

  for (let i = 0; i < 1010; i++) {
    if (source[i] === 0) {
      continue;
    }
    for (let j = 0; j < 1010; j++) {
      if (source[j] === 0) {
        continue;
      }
      if (i === j && source[i] < 2) {
        continue;
      }
      if (source[i] && source[j] && source[2020 - i - j]) {
        return console.log(i * j * (2020 - i - j));
      }
    }
  }
})();
