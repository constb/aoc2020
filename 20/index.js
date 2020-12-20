const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const groups = data.split(/\n{2,}/);

const tiles = {}
const edgeCandidates = {}

for (const tileLines of groups) {
  const lines = tileLines.split(/\n/)
  const head = lines.shift();

  const id = /Tile (\d+):/.exec(head)[1];
  tiles[id] = { lines }

  tiles[id].possibleEdges = [];
  tiles[id].possibleEdges[0] = lines[0]
  tiles[id].possibleEdges[1] = lines.map(l => l[0]).join('')
  tiles[id].possibleEdges[2] = lines.map(l => l[l.length-1]).join('')
  tiles[id].possibleEdges[3] = lines[lines.length-1];
  for (let i = 0; i < 4; i++) {
    tiles[id].possibleEdges.push([...tiles[id].possibleEdges[i]].reverse().join(''))
  }

  for (const edge of tiles[id].possibleEdges) {
    edgeCandidates[edge] = edgeCandidates[edge] || [];
    edgeCandidates[edge].push(id)
  }
}

for (const tileGroup of Object.values(edgeCandidates)) {
  if (tileGroup.length ===1) {
    continue;
  }
  for (const id of tileGroup) {
    tiles[id].connections = tiles[id].connections || 0
    tiles[id].connections ++;
  }
}

let result = 1;

for (const [id, {connections}] of Object.entries(tiles)) {
  if (connections === 4) {
    result *= id
  }
}

console.log(result);
