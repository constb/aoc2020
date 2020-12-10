const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const lines = data
  .split(/\n/)
  .map(Number)
  .sort((a, b) => a - b);

// inputs only have differences of 1 and 3
const input = [0, ...lines, lines[lines.length - 1] + 3];

// lengths of found contiguous blocks of values
const contiguous = [];
for (let i = 0; i < input.length - 1; i++) {
  if (input[i + 1] - input[i] === 1) {
    const start = i;
    while (input[i + 1] - input[i] === 1) {
      i++;
    }
    contiguous.push(i - start + 1);
  }
}

// variations[i] = 1 + 1 + 2 + ... + (contiguous[i] - 2)
const variations = contiguous.map((v) => Array.from({ length: v - 1 }).reduce((acc, _, i) => acc + i, 1));

// answer is all numbers of possible variations multiplied
console.log(variations.reduce((a, v) => a * v, 1));
