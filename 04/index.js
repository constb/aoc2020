const fs = require("fs");
const readline = require("readline");

(async function () {
  const rl = readline.createInterface({ input: fs.createReadStream("input.txt") });

  const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
  let lines = [];
  let foundFields = [];
  let result = 0;
  const re = /(\w{3}):\s*[^\s]+/g;

  for await (let line of rl) {
    line = line.trim();
    if (line.length > 0) {
      lines.push(line);
    } else {
      if (lines.length > 0) {
        const combo = lines.join(" ");

        let match;
        while ((match = re.exec(combo))) {
          foundFields.push(match[1]);
        }

        if (
          foundFields.length === fields.length ||
          (foundFields.length === fields.length - 1 && !foundFields.includes("cid"))
        ) {
          result++;
        }
      }

      lines = [];
      foundFields = [];
    }
  }

  console.log(result);
})();
