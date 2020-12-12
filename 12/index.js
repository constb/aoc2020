let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.split(/\n/);

const dirs = "ESWN";
let pos = [0, 0];
let dir = 0;

for (let i = 0; i < lines.length; i++) {
  let a = lines[i][0];
  const v = +lines[i].substr(1);
  if (a === "F") {
    a = dirs[dir];
  }
  switch (a) {
    case "N":
      pos[0] -= v;
      break;
    case "S":
      pos[0] += v;
      break;
    case "E":
      pos[1] += v;
      break;
    case "W":
      pos[1] -= v;
      break;
    case "L":
      dir = (dir - v / 90 + 4) % 4;
      break;
    case "R":
      dir = (dir + v / 90) % 4;
      break;
  }
}

console.log(Math.abs(pos[0]) + Math.abs(pos[1]));
