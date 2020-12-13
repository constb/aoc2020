let data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
let lines = data.split(/\n/);

const wait = +lines[0];
const buses = lines[1]
  .split(",")
  .map((x) => (x === "x" ? false : +x))
  .filter(Boolean);

let bus;
let minWait = wait;

buses.forEach((busInterval) => {
  const busWait = busInterval - (wait % busInterval);
  if (busWait < minWait) {
    bus = busInterval;
    minWait = busWait;
  }
});

console.log(minWait * bus);
