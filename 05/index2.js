const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const lines = data.split(/\n/);
const chars = lines.map((line) => (line.length > 0 ? [...line] : null)).filter(Boolean);

let max = 0;
let found = Array.from({ length: 881 }, () => false);
for (let line of chars) {
  let id = parseInt(line.map((char) => (char === "B" || char === "R" ? "1" : "0")).join(""), 2);
  found[id] = true;
  max = Math.max(max, id);
  // console.log(line.join(""), row, seat, id);
}

found.forEach((v, idx) => {
  if (idx !== 0 && idx < max && !found[idx] && found[idx - 1] && found[idx + 1]) {
    console.log(idx);
  }
});
