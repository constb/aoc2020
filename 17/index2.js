const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const lines = data.split(/\n/);
const map = lines.map((line) => [...line]);

// TypeError: Cannot read property '-1' of undefined => increase size!
const size = 11;
const mapSize = size * 2 + map[0].length;

const emptyPlane = Array.from({ length: mapSize }, () =>
  Array.from({ length: mapSize }, () =>
    Array.from({ length: mapSize }, () =>
      "."))
);

let space = [];
let nextSpace = [];

for (let i = 0; i <= mapSize; i++) {
  space[i] = JSON.parse(JSON.stringify(emptyPlane));
  nextSpace[i] = JSON.parse(JSON.stringify(emptyPlane));
}

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    space[size][size][size + i][size + j] = map[i][j];
  }
}

function runIteration() {
  const bounds = { x: [mapSize, 0], y: [mapSize, 0], z: [mapSize, 0], w: [mapSize, 0] };

  for (let i = 0; i < space.length; i++) {
    for (let j = 0; j < space[i].length; j++) {
      for (let k = 0; k < space[i][j].length; k++) {
        let [f, l] = [space[i][j][k].indexOf("#"), space[i][j][k].lastIndexOf("#")];
        if (f !== -1) {
          bounds.x = [Math.min(bounds.x[0], i), Math.max(bounds.x[1], i)];
          bounds.y = [Math.min(bounds.y[0], j), Math.max(bounds.y[1], j)];
          bounds.z = [Math.min(bounds.z[0], k), Math.max(bounds.z[1], k)];
          bounds.w = [Math.min(bounds.w[0], f), Math.max(bounds.w[1], f)];
        }
      }
    }
  }

  console.log("bounds >", bounds);

  const extra = 5;
  for (let x = bounds.x[0] - extra; x < bounds.x[1] + extra; x++) {
    for (let y = bounds.y[0] - extra; y < bounds.y[1] + extra; y++) {
      for (let z = bounds.z[0] - extra; z < bounds.z[1] + extra; z++) {
        for (let w = bounds.w[0] - extra; w < bounds.w[1] + extra; w++) {
          let neighbors = 0;
          for (const a of [-1, 0, 1]) {
            for (const b of [-1, 0, 1]) {
              for (const c of [-1, 0, 1]) {
                for (const d of [-1, 0, 1]) {
                  if (a === 0 && b === 0 && c === 0 && d === 0) {
                    continue;
                  }
                  if (space[x + a][y + b][z + c][w + d] === "#") {
                    neighbors++;
                  }
                }
              }
            }
          }

          nextSpace[x][y][z][w] = neighbors === 3 || (neighbors === 2 && space[x][y][z][w] === "#") ? "#" : ".";
        }
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
