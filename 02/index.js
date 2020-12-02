const fs = require("fs");
const readline = require("readline");

let result = 0;
let reg = /^(\d+)-(\d+)\s+(\w):\s*(\w+)\s*$/;

(async function () {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (let line of rl) {
    line = line.trim();
    if (line.length > 0) {
      const [, min, max, char, str] = reg.exec(line);
      let count = 0;
      [...str].forEach((c) => {
        if (c === char) {
          count++;
        }
      });
      if (count >= min && count <= max) {
        result++;
      }
    }
  }

  console.log(result);
})();
