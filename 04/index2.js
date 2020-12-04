const fs = require("fs");
const readline = require("readline");

(async function () {
  const rl = readline.createInterface({
    input: fs.createReadStream("input.txt"),
  });

  const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
  let lines = [];
  let found = {};
  let result = 0;
  const re = /(\w{3}):\s*([^\s]+)/g;

  for await (let line of rl) {
    line = line.trim();
    if (line.length > 0) {
      lines.push(line);
    } else {
      if (lines.length > 0) {
        const combo = lines.join(" ");
        let match;
        while ((match = re.exec(combo))) {
          found[match[1]] = match[2];
        }
        const foundKeys = Object.keys(found);
        if (
          foundKeys.length === fields.length ||
          (foundKeys.length === fields.length - 1 && !foundKeys.includes("cid"))
        ) {
          if (
            /^\d{4}$/.exec(found.byr) &&
            Number(found.byr) >= 1920 &&
            Number(found.byr) <= 2002
          ) {
            if (
              /^\d{4}$/.exec(found.iyr) &&
              Number(found.iyr) >= 2010 &&
              Number(found.iyr) <= 2020
            ) {
              if (
                /^\d{4}$/.exec(found.eyr) &&
                Number(found.eyr) >= 2020 &&
                Number(found.eyr) <= 2030
              ) {
                const h = /^(\d{1,3})(cm|in)$/.exec(found.hgt);
                if (
                  h &&
                  ((h[2] === "cm" &&
                    Number(h[1]) >= 150 &&
                    Number(h[1]) <= 193) ||
                    (h[2] === "in" && Number(h[1]) >= 59 && Number(h[1]) <= 76))
                ) {
                  if (/^#[0-9a-f]{6}$/.exec(found.hcl)) {
                    if (
                      [
                        "amb",
                        "blu",
                        "brn",
                        "gry",
                        "grn",
                        "hzl",
                        "oth",
                      ].includes(found.ecl)
                    ) {
                      if (/^\d{9}$/.exec(found.pid)) {
                        result++;
                      } else console.log("bad pid", found.pid);
                    } else console.log("bad ecl", found.ecl);
                  } else console.log("bad hcl", found.hcl);
                } else console.log("bad hgt", found.hgt);
              } else console.log("bad eyr", found.eyr);
            } else console.log("bad iyr", found.iyr);
          } else console.log("bad byr", found.byr);
        }
      }

      lines = [];
      found = {};
    }
  }

  console.log(result);
})();
