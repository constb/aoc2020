const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const groups = data.split(/\n{2,}/);
const answers = groups.map((g) => g.split(/\n/));
const alphabet = "abcdefghijklmnopqrstuvwxyz";
let sum = 0;
answers.forEach((lines) => {
  [...alphabet].forEach((char) => {
    sum += lines.every((line) => line.indexOf(char) !== -1);
  });
});
console.log(sum);
