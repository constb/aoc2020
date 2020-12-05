const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const lines = data.split(/\n/);

let found = Array.from({ length: 881 }, () => "0");
for (let line of lines) {
  const id = parseInt(line.replace(/(B|R)/g, "1").replace(/F|L/g, "0"), 2);
  found[id] = "1";
}
console.log(found.join("").indexOf("101") + 1);
