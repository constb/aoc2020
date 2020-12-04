const fs = require("fs");
const readline = require("readline");

const source = Array.from({ length: 2021 }, () => false);
let n1010 = 0;

(async function () {
  const rl = readline.createInterface({ input: fs.createReadStream("input.txt") });

  for await (let line of rl) {
    line = line.trim();
    if (line.length > 0) {
      const n = parseInt(line, 10);
      if (Number.isFinite(n) && n >= 0 && n <= 2020) {
        source[n] = true;
        if (n === 1010) {
          n1010++;
        }
      }
    }
  }

  if (n1010 > 1) {
    return console.log(1010 * 1010);
  }

  for (let i = 0; i < 1010; i++) {
    if (source[i] && source[2020 - i]) {
      return console.log(i * (2020 - i));
    }
  }
})();
