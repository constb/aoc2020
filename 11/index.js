let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let state = data.split(/\n/);

function get(row, col) {
  return state[row] && state[row][col];
}

function replace(line, pos, char) {
  return line.slice(0, pos) + char + line.slice(pos + 1);
}

function seatingRound() {
  let changed = false;
  let nextState = [...state];
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length; j++) {
      if (state[i][j] === ".") continue;
      let occupied = 0;
      for (let a of [0, 1, -1]) {
        for (let b of [0, 1, -1]) {
          if (a === 0 && b === 0) continue;
          occupied += get(i + a, j + b) === "#";
        }
      }
      if (state[i][j] === "#" && occupied >= 4) {
        nextState[i] = replace(nextState[i], j, "L");
        changed = true;
      }
      if (state[i][j] === "L" && occupied === 0) {
        nextState[i] = replace(nextState[i], j, "#");
        changed = true;
      }
    }
  }
  state = nextState;
  return changed;
}

while (seatingRound());
const result = state.reduce((acc, row) => acc + [...row].filter((seat) => seat === "#").length, 0);
console.log(result);
