const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const groups = data.split(/\n{2,}/);

const tiles = {};
const edgeCandidates = {};

// find edge candidates per tile
for (const tileLines of groups) {
  const lines = tileLines.split(/\n/);
  const head = lines.shift();

  const id = /Tile (\d+):/.exec(head)[1];
  tiles[id] = { lines };

  tiles[id].possibleEdges = [];
  tiles[id].possibleEdges[0] = lines[0];
  tiles[id].possibleEdges[1] = lines.map((l) => l[0]).join("");
  tiles[id].possibleEdges[2] = lines.map((l) => l[l.length - 1]).join("");
  tiles[id].possibleEdges[3] = lines[lines.length - 1];

  for (let i = 0; i < 4; i++) {
    tiles[id].possibleEdges.push([...tiles[id].possibleEdges[i]].reverse().join(""));
  }

  for (const edge of tiles[id].possibleEdges) {
    edgeCandidates[edge] = edgeCandidates[edge] || [];
    edgeCandidates[edge].push(id);
  }

  tiles[id].id = id;
  tiles[id].adjacent = [];
}

// count possible connections
// collect adjacency data
for (const [edge, ids] of Object.entries(edgeCandidates)) {
  if (ids.length === 1) {
    continue;
  }
  for (const id of ids) {
    tiles[id].connections = tiles[id].connections || 0;
    tiles[id].connections++;
  }
  tiles[ids[0]].adjacent.push({ t: tiles[ids[1]], e: edge });
  tiles[ids[1]].adjacent.push({ t: tiles[ids[0]], e: edge });
}

// collect edge tiles ids
const edgeTiles = Object.values(tiles)
  .filter(({ id, connections }) => connections === 4)
  .map(({ id }) => id);

// helpers
function flipLines(lines) {
  for (const [k, line] of lines.entries()) {
    lines[k] = [...line].reverse().join("");
  }
}

function rotateLines(lines) {
  const oldLines = lines.map((l) => [...l]);
  const newLines = Array.from({ length: oldLines.length }, () => Array.from({ length: oldLines.length }, () => ""));

  for (let j = oldLines.length - 1; j >= 0; j--) {
    for (let i = 0; i < oldLines.length; i++) {
      newLines[j][i] = oldLines[i][oldLines.length - j - 1];
    }
  }

  newLines.forEach((l, idx) => {
    lines[idx] = l.join("");
  });
}

// make map of tile ids
const map = [];
const availableIds = new Set(Object.keys(tiles));

// place first edge tile
{
  // based on the order of generated possible edges
  const flipIfEdge = [1, 3, 4, 6];
  // rotate to make connecting edge on top
  // all rotations are counter-clockwise
  const rotateIfEdge = [0, 1, 1, 2, 0, 3, 3, 2];

  map[0] = [edgeTiles[0]];
  const connectingEdgeString = tiles[map[0][0]].adjacent[0].e;
  const edgeStringNo = tiles[map[0][0]].possibleEdges.indexOf(connectingEdgeString);

  if (flipIfEdge.includes(edgeStringNo)) {
    flipLines(tiles[map[0][0]].lines);
  }
  // 3 extra rotations to make connecting edge on the right
  for (let r = 0; r < rotateIfEdge[edgeStringNo] + 3; r++) {
    rotateLines(tiles[map[0][0]].lines);
  }
}
availableIds.delete(map[0][0]);

// last placed tile, py - line no, px - tile in line
let px = 0;
let py = 0;

// place all remaining tiles
{
  let isFirstLine = true;

  do {
    const rightEdgeString = tiles[map[py][px]].lines.map((l) => l[l.length - 1]).join("");
    const adj = tiles[map[py][px]].adjacent.find(({ t: tileCandidate }) => {
      if (!availableIds.has(tileCandidate.id)) return false;

      for (let i = 0; i < 4; i++) {
        const leftEdgeString = tileCandidate.lines.map((l) => l[0]).join("");
        if (rightEdgeString === leftEdgeString) return true;
        rotateLines(tileCandidate.lines);
      }
      flipLines(tileCandidate.lines);
      for (let i = 0; i < 4; i++) {
        const leftEdgeString = tileCandidate.lines.map((l) => l[0]).join("");
        if (rightEdgeString === leftEdgeString) return true;
        rotateLines(tileCandidate.lines);
      }
    });

    // if (!adj) return console.log("bad left step");

    availableIds.delete(adj.t.id);
    map[py][px + 1] = adj.t.id;

    // first line ends on edge tile
    // other lines end at first line length
    if ((isFirstLine && !edgeTiles.includes(adj.t.id)) || map[py].length !== map[0].length) {
      // not the end of the line
      px++;
      continue;
    }

    if (availableIds.size === 0) {
      // no more tiles
      break;
    }

    // line has ended, must place first tile on the next line
    {
      let bottomEdgeString = tiles[map[py][0]].lines[tiles[map[py][0]].lines.length - 1];
      let adj = tiles[map[py][0]].adjacent.find(({ t: tileCandidate }) => {
        if (!availableIds.has(tileCandidate.id)) return false;

        for (let i = 0; i < 4; i++) {
          const topEdgeString = tileCandidate.lines[0];
          if (bottomEdgeString === topEdgeString) return true;
          rotateLines(tileCandidate.lines);
        }
        flipLines(tileCandidate.lines);
        for (let i = 0; i < 4; i++) {
          const topEdgeString = tileCandidate.lines[0];
          if (bottomEdgeString === topEdgeString) return true;
          rotateLines(tileCandidate.lines);
        }
      });

      // first line may need to be entirely flipped for this to work
      if (!adj && isFirstLine) {
        map[0].forEach((id) => {
          tiles[id].lines.reverse();
        });

        bottomEdgeString = tiles[map[py][0]].lines[tiles[map[py][0]].lines.length - 1];
        adj = tiles[map[py][0]].adjacent.find(({ t: tileCandidate }) => {
          if (!availableIds.has(tileCandidate.id)) return false;

          for (let i = 0; i < 4; i++) {
            const topEdgeString = tileCandidate.lines[0];
            if (bottomEdgeString === topEdgeString) return true;
            rotateLines(tileCandidate.lines);
          }
          flipLines(tileCandidate.lines);
          for (let i = 0; i < 4; i++) {
            const topEdgeString = tileCandidate.lines[0];
            if (bottomEdgeString === topEdgeString) return true;
            rotateLines(tileCandidate.lines);
          }
        });
      }

      // if (!adj) return console.log("bad line step");

      availableIds.delete(adj.t.id);
      map[py + 1] = [adj.t.id];
      px = 0;
      py++;
      isFirstLine = false;
    }
  } while (true);
}

// make final image
const image = [];
const tileSizeForImage = tiles[map[0][0]].lines.length - 2;
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[0].length; j++) {
    for (let k = 1; k <= tileSizeForImage; k++) {
      const line = tiles[map[i][j]].lines[k].substr(1, tiles[map[i][j]].lines[k].length - 2);

      image[i * tileSizeForImage + (k - 1)] = image[i * tileSizeForImage + (k - 1)] || "";
      image[i * tileSizeForImage + (k - 1)] = image[i * tileSizeForImage + (k - 1)] + line;
    }
  }
}

const pattern = [
  `                  # `, //
  `#    ##    ##    ###`, //
  ` #  #  #  #  #  #   `, //
];

// offsets relative to first hash on second line in pattern
const requiredHashesOffset = [];
for (let i = 0; i < pattern.length; i++) {
  for (let j = 0; j < pattern[0].length; j++) {
    if (pattern[i][j] === "#") {
      requiredHashesOffset.push([i - 1, j]);
    }
  }
}

const imageSize = image.length;

function countPatterns() {
  let res = 0;
  for (let i = 1; i < imageSize - 1; i++) {
    for (let j = 0; j < imageSize - pattern[0].length; j++) {
      res += requiredHashesOffset.every((shift) => image[i + shift[0]][j + shift[1]] === "#");
    }
  }
  return res;
}

// only one flip/rotate combo has patterns!
let foundPatterns = 0;
search: do {
  for (let i = 0; i < 4; i++) {
    if ((foundPatterns = countPatterns())) break search;
    rotateLines(image);
  }
  flipLines(image);
  for (let i = 0; i < 4; i++) {
    if ((foundPatterns = countPatterns())) break search;
    rotateLines(image);
  }
} while (false);

// result is number of hashes that don't belong to a pattern
const hashesInPattern = [...pattern.join("")].filter((char) => char === "#").length;
const hashesInImage = [...image.join("")].filter((char) => char === "#").length;
console.log(hashesInImage - hashesInPattern * foundPatterns);
