const fs = require("fs");
const readline = require("readline");

let result = 0;
let reg = /^(\d+)-(\d+)\s+(\w):\s*(\w+)\s*$/;

(async function () {
  const rl = readline.createInterface({ input: fs.createReadStream("input.txt") });

  for await (let line of rl) {
    line = line.trim();
    if (line.length > 0) {
      const [, min, max, char, str] = reg.exec(line);
      let count = 0;
      [...str].forEach((c) => (count += c === char));
      result += count >= min && count <= max;
    }
  }

  console.log(result);
})();
