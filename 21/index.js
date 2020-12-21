const data = require("fs").readFileSync("input.txt", { encoding: "utf-8" }).trim();
const lines = data.split(/\n/);

const products = [];
const allIngredients = new Set();
const allAllergens = new Set();

for (const line of lines) {
  const p = line.split("(contains ");

  const ing = p[0].trim().split(" ");
  const alg = p[1].substr(0, p[1].length - 1).split(", ");

  products.push([ing.sort(), alg.sort()]);
  ing.forEach((i) => allIngredients.add(i));
  alg.forEach((a) => allAllergens.add(a));
}

function intersect(arr1, arr2) {
  return arr1.filter((a) => arr2.includes(a));
}

const found = {}; // allergen -> ingredient

function mapAllergens(usedProducts, commonIngredients, commonAllergens) {
  for (const [productId, [productIng, productAlg]] of products.entries()) {
    if (usedProducts.includes(productId)) return;

    const nextIng = intersect(commonIngredients, productIng).filter((i) => !Object.values(found).includes(i));
    const nextAlg = intersect(commonAllergens, productAlg).filter((i) => !Object.keys(found).includes(i));

    if (nextIng.length === 0 || nextAlg.length === 0) continue;

    if (nextIng.length === nextAlg.length) {
      for (const [idx, ingredient] of nextIng.entries()) {
        const allergen = nextAlg[idx];
        found[allergen] = ingredient;
      }
    }
    mapAllergens([...usedProducts, productId], nextIng, nextAlg);
  }
}

while (true) {
  const before = Object.keys(found).length;
  mapAllergens([], [...allIngredients], [...allAllergens]);
  const after = Object.keys(found).length;
  if (after === allAllergens.size) {
    console.log("good");
    break;
  }
  if (before === after) {
    console.log("stuck");
    return;
  }
}

const safeIngredients = [...allIngredients].filter((ing) => !Object.values(found).includes(ing));

const part1 = products.reduce((acc, [ingredients]) => acc + intersect(ingredients, safeIngredients).length, 0);
const part2 = Object.keys(found)
  .sort()
  .map((a) => found[a])
  .join(",");

// console.log(found);

console.log("part 1", part1);
console.log("part 2", part2);
