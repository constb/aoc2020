const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const lines = data.split(/\n/);
const map = lines.map((line) => [...line]);

const size = 6;
const mapSize = size * 2 + map[0].length;

const emptyPlane = Array.from({ length: mapSize }, () => Array.from({ length: mapSize }, () => "."));

let space = [];
let nextSpace = [];

for (let i = 0; i <= mapSize; i++) {
  space[i] = JSON.parse(JSON.stringify(emptyPlane));
  nextSpace[i] = JSON.parse(JSON.stringify(emptyPlane));
}

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    space[size][size + i][size + j] = map[i][j];
  }
}

function runIteration() {
  for (let x = 1; x < space.length - 1; x++) {
    for (let y = 1; y < space[x].length - 1; y++) {
      for (let z = 1; z < space[x][y].length - 1; z++) {
        let neighbors = 0;
        for (const a of [-1, 0, 1]) {
          for (const b of [-1, 0, 1]) {
            for (const c of [-1, 0, 1]) {
              if (a === 0 && b === 0 && c === 0) {
                continue;
              }
              if (space[x + a][y + b][z + c] === "#") {
                neighbors++;
              }
            }
          }
        }

        nextSpace[x][y][z] = neighbors === 3 || (neighbors === 2 && space[x][y][z] === "#") ? "#" : ".";
      }
    }
  }

  let t = space;
  space = nextSpace;
  nextSpace = t;
}

for (let i = 0; i < 6; i++) {
  console.log("iteration >", i + 1);
  runIteration();
}

const result = space.flat(Infinity).filter((v) => v === "#").length;
console.log(result);
