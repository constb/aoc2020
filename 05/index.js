const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const lines = data.split(/\n/);
const chars = lines.map((line) => [...line]);

console.log({ data, lines, chars });
