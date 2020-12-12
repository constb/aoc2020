let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.split(/\n/);

let pos = [0, 0];
let wp = [-1, 10];

for (let i = 0; i < lines.length; i++) {
  let a = lines[i][0];
  let v = +lines[i].substr(1);
  if (a === "R") {
    a = "L";
    v = 360 - v;
  }
  switch (a) {
    case "F":
      pos[0] += wp[0] * v;
      pos[1] += wp[1] * v;
      break;
    case "N":
      wp[0] -= v;
      break;
    case "S":
      wp[0] += v;
      break;
    case "E":
      wp[1] += v;
      break;
    case "W":
      wp[1] -= v;
      break;
    case "L":
      do {
        wp = [-wp[1], wp[0]];
      } while ((v -= 90));
      break;
  }
}

console.log(Math.abs(pos[0]) + Math.abs(pos[1]));

/*
            +
      2,-1  +
            +
            +      1,2
            +
+++++++++++++++++++++++++
            +
  -1,-2     +
            +
            +
            +
*/
