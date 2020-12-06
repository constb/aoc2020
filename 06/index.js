const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const groups = data.split(/\n{2,}/).map((d) => d.replace(/[^a-z]/gs, ""));
const answers = groups.map((g) => new Set([...g]));
const sum = answers.reduce((acc, a) => (acc += a.size), 0);
console.log(sum);
