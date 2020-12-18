let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.split(/\n/);

const re = /\([^()]+\)/;

function calculate(line) {
  const parts = line.split(" ");
  let res = +parts[0];
  for (let i = 1; i < parts.length; i += 2) {
    switch (parts[i]) {
      case "+":
        res += +parts[i + 1];
        break;
      case "*":
        res *= +parts[i + 1];
        break;
    }
  }
  return res;
}

const re2 = /\d+\s\+\s\d+/;

function calculate2(line) {
  let matches;
  while ((matches = re2.exec(line))) {
    const partialValue = calculate(matches[0]);
    line = line.substr(0, matches.index) + partialValue + line.substr(matches.index + matches[0].length);
  }
  return calculate(line);
}

let result = 0;

for (let line of lines) {
  let matches;
  while ((matches = re.exec(line))) {
    const partialValue = calculate2(matches[0].substr(1, matches[0].length - 2));
    line = line.substr(0, matches.index) + partialValue + line.substr(matches.index + matches[0].length);
  }
  result += calculate2(line);
}

console.log(result);
