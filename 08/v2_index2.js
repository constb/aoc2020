let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.split(/\n/);

const vm = {
  nop: (acc, pos) => [acc, pos + 1],
  jmp: (acc, pos, val) => [acc, pos + Number(val)],
  acc: (acc, pos, val) => [acc + Number(val), pos + 1],

  brk: () => {
    throw false;
  },
  ret: (acc) => {
    throw acc;
  },
};

function run(prog) {
  let pos = 0;
  let acc = 0;

  prog.push("ret");
  do {
    if (pos >= prog.length) throw false;

    const prev = pos;
    const [ins, val] = prog[pos].split(" ");
    [acc, pos] = vm[ins](acc, pos, val);
    prog[prev] = "brk";
  } while (true);
}

lines.forEach((line, i) => {
  const t = [...lines];
  const [ins, val] = line.split(" ");

  if (!["jmp", "nop"].includes(ins)) return;
  t[i] = ["jmp", "nop"][+(ins === "jmp")] + " " + val;

  try {
    run(t);
  } catch (e) {
    if (e !== false) return console.log(e);
  }
});
