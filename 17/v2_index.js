const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const lines = data.split(/\n/);
const map = lines.map((line) => [...line]);

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function nestedIterate(bounds, level, coordsBase, source, result) {
  if (level < bounds.length) {
    for (const i of range(...bounds[level])) {
      nestedIterate(bounds, level + 1, [...coordsBase, i], source, result);
    }
  } else {
    const active = source.has(coordsBase.join(","));
    const neighbors = nestedNeighbors(0, coordsBase, [], source);
    if (neighbors === 3 || (neighbors === 2 && source.has(coordsBase.join(",")))) {
      result.add(coordsBase.join(","));
    }
  }
}

function nestedNeighbors(level, coords, shiftsBase, source) {
  if (level === coords.length) {
    return !shiftsBase.every((x) => x === 0) && source.has(coords.map((v, i) => v + shiftsBase[i]).join(",")) ? 1 : 0;
  } else {
    return range(-1, 1).reduce((acc, i) => acc + nestedNeighbors(level + 1, coords, [...shiftsBase, i], source), 0);
  }
}

function run(dimensions, iterations) {
  let active = new Set(
    map
      .map((line, x) =>
        line.map((v, y) =>
          v === "#" ? `${x},${y},${Array.from({ length: dimensions - 2 }, () => 0).join(",")}` : null
        )
      )
      .flat()
      .filter(Boolean)
  );

  const bounds = [[-1, map.length], [-1, map[0].length], ...Array.from({ length: dimensions - 2 }, () => [-1, 1])];

  while (iterations > 0) {
    iterations--;

    const next = new Set();
    nestedIterate(bounds, 0, [], active, next);

    bounds.forEach((b) => {
      b[0]--;
      b[1]++;
    });
    active = next;
  }

  return active.size;
}

console.log("part 1", run(3, 6));
console.log("part 2", run(4, 6));
