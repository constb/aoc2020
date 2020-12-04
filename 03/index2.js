const fs = require("fs");
const readline = require("readline");

(async function () {
  const rl = readline.createInterface({
    input: fs.createReadStream("input.txt"),
  });

  const map = [];
  const slopes = [1, 3, 5, 7, 1];
  const result = [0, 0, 0, 0, 0];
  const pos = [0, 0, 0, 0, 0];
  let even = true;

  for await (let line of rl) {
    line = line.trim();
    if (line.length > 0) {
      result.forEach((v, idx) => {
        if (idx === 4 && !even) return;
        if (line[pos[idx] % line.length] === "#") {
          result[idx]++;
        }
      });
      pos.forEach((v, idx) => {
        if (idx === 4 && !even) return;
        pos[idx] += slopes[idx];
      });
      even = !even;
    }
  }

  console.log(
    result,
    result.reduce((acc, v) => acc * v, 1)
  );
})();
