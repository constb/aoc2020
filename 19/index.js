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

function test(line, pos, rule) {
  if (typeof rules[rule] === "string") {
    return line[pos] === rules[rule] ? pos + 1 : false;
  }

  for (const variant of rules[rule]) {
    let testPos = pos;
    let good = true;

    for (const testRule of variant) {
      testPos = test(line, testPos, testRule);
      if (testPos === false) {
        good = false;
        break;
      }
    }

    if (good) {
      return testPos;
    }
  }
  return false;
}

const result = groups[1].split(/\n/).filter((line) => test(line, 0, 0) === line.length).length;

console.log(result);
