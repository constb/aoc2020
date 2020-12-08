let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.split(/\n/);

const vm = {
  nop: (acc, pos) => [acc, pos + 1],
  jmp: (acc, pos, val) => [acc, pos + Number(val)],
  acc: (acc, pos, val) => [acc + Number(val), pos + 1],
};

function test(testLines) {
  let pos = 0;
  let acc = 0;
  let was = Array.from({ length: testLines.length }, () => false);

  do {
    if (pos === testLines.length) return acc;
    if (pos > testLines.length || was[pos]) return false;
    was[pos] = true;

    const [ins, val] = testLines[pos].split(" ");
    [acc, pos] = vm[ins](acc, pos, val);
  } while (true);
}

lines.forEach((line, i) => {
  const t = [...lines];
  const [ins, val] = line.split(" ");
  switch (ins) {
    case "jmp":
      t[i] = "nop";
      break;
    case "nop":
      t[i] = "jmp " + val;
      break;
    default:
      return;
  }

  let result = test(t);
  if (result !== false) return console.log(result);
});
