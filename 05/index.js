const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const lines = data.split(/\n/);
const chars = lines.map((line) => (line.length > 0 ? [...line] : null)).filter(Boolean);

let max = 0;
for (let line of chars) {
  let id = parseInt(line.map((char) => (char === "B" || char === "R" ? "1" : "0")).join(""), 2);
  max = Math.max(max, id);
  // console.log(line.join(""), id);
}

console.log(max);
