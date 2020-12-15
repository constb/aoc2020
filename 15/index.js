const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const numbers = data.split(/,/).map(Number);

const spokenLast = Array.from({ length: 30000001 }, () => false);
const spokenBeforeLast = Array.from({ length: 30000001 }, () => false);
numbers.forEach((n, i) => (spokenLast[n] = i + 1));

let last = numbers[numbers.length - 1];

for (let turn = numbers.length + 1; turn <= 30000000; turn++) {
  let next;

  if (last !== 0 && spokenBeforeLast[last] === false) {
    next = 0;
  } else {
    next = spokenLast[last] - spokenBeforeLast[last];
  }

  spokenBeforeLast[next] = spokenLast[next];
  spokenLast[next] = turn;
  last = next;

  if (turn === 2020) {
    console.log("part 1", last);
  }
}
console.log("part 2", last)
