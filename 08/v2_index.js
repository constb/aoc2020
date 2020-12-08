const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const lines = data.split(/\n/);

let pos = 0;
let acc = 0;

const vm = {
  nop: (acc, pos) => [acc, pos + 1],
  jmp: (acc, pos, val) => [acc, pos + Number(val)],
  acc: (acc, pos, val) => [acc + Number(val), pos + 1],

  brk: () => {
    throw false;
  },
};

try {
  do {
    const [ins, val] = lines[pos].split(" ");
    const prev = pos;
    [acc, pos] = vm[ins](acc, pos, val);
    lines[prev] = "brk";
  } while (true);
} catch (e) {
  console.log(acc);
}
