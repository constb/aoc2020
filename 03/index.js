const fs = require("fs");
const readline = require("readline");

(async function () {
  const rl = readline.createInterface({
    input: fs.createReadStream("input.txt"),
  });

  const map = [];
  let result = 0;
  let pos = 0;

  for await (let line of rl) {
    line = line.trim();
    if (line.length > 0) {
      if (line.charAt(pos % line.length) === "#") {
        result++;
      }
      pos += 3;
    }
  }

  console.log(result);
})();
