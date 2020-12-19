const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const groups = data.split(/\n{2,}/);

const rules = Array.from({ length: 1024 }, () => false);

for (const r of groups[0].split(/\n/)) {
  let [key, variants] = r.split(": ");
  key = +key;

  if (variants[0] === '"') {
    rules[key] = variants[1];
  } else {
    rules[key] = variants.split(" | ").map((variantRules) => variantRules.split(" ").map(Number));
  }
}

rules[8] = [[42], [42, 8]];
rules[11] = [
  [42, 31],
  [42, 11, 31],
];

function test(line, pos, rule) {
  if (pos >= line.length) {
    return false;
  }

  if (typeof rules[rule] === "string") {
    return line[pos] === rules[rule] ? [pos + 1] : false;
  }

  const possibleNextPositions = [];
  for (const variants of rules[rule]) {
    let testPositions = [pos];
    let good = true;

    for (const testRule of variants) {
      testPositions = testPositions
        .map((testPos) => test(line, testPos, testRule))
        .filter((res) => res !== false)
        .flat();
      if (testPositions.length === 0) {
        good = false;
        break;
      }
    }

    if (good) {
      possibleNextPositions.push(...testPositions);
    }
  }

  if (possibleNextPositions.length > 0) {
    return possibleNextPositions;
  }

  return false;
}

const result = groups[1].split(/\n/).filter((line) => {
  const matchSizes = test(line, 0, 0);
  return matchSizes !== false && matchSizes.some(matchLength => matchLength === line.length);
}).length;

console.log(result);
