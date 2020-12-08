const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const lines = data.split(/\n/);

let pos = 0;
let acc = 0;
let was = Array.from({ length: lines.length }, () => false);

const vm = {
  nop: (acc, pos) => [acc, pos + 1],
  jmp: (acc, pos, val) => [acc, pos + Number(val)],
  acc: (acc, pos, val) => [acc + Number(val), pos + 1],
};

do {
  if (was[pos]) return console.log(acc);
  was[pos] = true;

  const [ins, val] = lines[pos].split(" ");
  [acc, pos] = vm[ins](acc, pos, val);
} while (true);
