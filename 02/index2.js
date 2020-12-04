const fs = require("fs");
const readline = require("readline");

let result = 0;
let reg = /^(\d+)-(\d+)\s+(\w):\s*(\w+)\s*$/;

(async function () {
  const rl = readline.createInterface({ input: fs.createReadStream("input.txt") });

  for await (let line of rl) {
    line = line.trim();
    if (line.length > 0) {
      const [, p1, p2, char, str] = reg.exec(line);
      const x1 = str.length >= p1 && str.charAt(p1 - 1) === char;
      const x2 = str.length >= p2 && str.charAt(p2 - 1) === char;
      if (x1 ^ x2) {
        result++;
      }
    }
  }

  console.log(result);
})();
