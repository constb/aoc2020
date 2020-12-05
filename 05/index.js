const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const lines = data.split(/\n/);

let max = 0;
for (let line of lines) {
  const id = parseInt(line.replace(/(B|R)/g, "1").replace(/F|L/g, "0"), 2);
  max = Math.max(max, id);
}

console.log(max);
