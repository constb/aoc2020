let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.split(/\n/);

const re1 = /^mask.=.(\w+)$/;
const re2 = /^mem\[(\d+)\].=.(\d+)$/;
let memory = {};
let maskAnd, maskOr;

lines.forEach((line) => {
  let m1 = re1.exec(line);
  if (m1) {
    maskAnd = BigInt(parseInt([...m1[1]].map((x) => (x === "X" || x === "1" ? "1" : "0")).join(""), 2));
    maskOr = BigInt(parseInt([...m1[1]].map((x) => (x === "X" || x === "0" ? "0" : "1")).join(""), 2));
  } else {
    let m2 = re2.exec(line);
    let addr = m2[1];
    let v = BigInt(m2[2]);
    memory[addr] = (v & maskAnd) | maskOr;
  }
});

const sum = Object.values(memory).reduce((a, v) => a + v, 0n);
console.log(sum.toString());
