let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.split(/\n/);

const re1 = /^mask.=.(\w+)$/;
const re2 = /^mem\[(\d+)\].=.(\d+)$/;
let memory = {};
let mask;

function shiftify(values) {
  return values.map((v) => v << 1n);
}

function oneify(values) {
  return values.map((v) => v | 1n);
}

lines.forEach((line) => {
  let m1 = re1.exec(line);
  if (m1) {
    mask = m1[1];
  } else {
    let m2 = re2.exec(line);
    let base = Number(m2[1]).toString(2).padStart(36, "0");
    let v = BigInt(m2[2]);

    let addresses = [0n];
    [...mask].forEach((digit, index) => {
      addresses = shiftify(addresses);
      if (digit === "X") {
        addresses = [...addresses, ...oneify(addresses)];
      } else if (digit === "1" || base[index] === "1") {
        addresses = oneify(addresses);
      }
    });
    addresses.forEach((a) => {
      memory[a] = v;
    });
  }
});

const sum = Object.values(memory).reduce((a, v) => a + v, 0n);
console.log(sum.toString());
