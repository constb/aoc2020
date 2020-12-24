const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const lines = data.split(/\n/);

let flipped = new Set();

for (const line of lines) {
  let px = 0;
  let py = 0;

  for (let i = 0; i < line.length; i++) {
    switch (line[i]) {
      case "e":
        px++;
        break;
      case "w":
        px--;
        break;
      case "n":
        if (line[i + 1] === "e") {
          py--;
          px++;
        } else {
          py--;
        }
        i++;
        break;
      case "s":
        if (line[i + 1] === "e") {
          py++;
        } else {
          py++;
          px--;
        }
        i++;
        break;
    }
  }

  const tile = px + "," + py;
  if (flipped.has(tile)) flipped.delete(tile);
  else flipped.add(tile);
}

function adjacent(x, y) {
  return [
    [x + 1, y],
    [x - 1, y],
    [x + 1, y - 1],
    [x, y - 1],
    [x, y + 1],
    [x - 1, y + 1],
  ];
}

function play() {
  const next = new Set();

  const allFlipped = [...flipped].map((i) => i.split(",").map(Number));
  const mnx = Math.min(...allFlipped.map(([x]) => x));
  const mxx = Math.max(...allFlipped.map(([x]) => x));
  const mny = Math.min(...allFlipped.map(([, y]) => y));
  const mxy = Math.max(...allFlipped.map(([, y]) => y));

  for (let x = mnx - 1; x <= mxx + 1; x++) {
    for (let y = mny - 1; y <= mxy + 1; y++) {
      const neighbors = adjacent(x, y).filter(([xx, yy]) => flipped.has(xx + "," + yy)).length;
      if (neighbors === 2 || (neighbors === 1 && flipped.has(x + "," + y))) next.add("" + x + "," + y);
    }
  }

  flipped = next;
}

console.log("day", 0, "flipped", flipped.size, "part 1 answer");

for (let i = 0; i < 100; i++) {
  // if (i > 0 && (i < 10 || i % 10 === 0)) console.log("day", i, "flipped", flipped.size);
  play();
}

console.log("day", 100, "flipped", flipped.size, "part 2 answer");
