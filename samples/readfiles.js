// Lire les 3 fichiers (1.txt, 2.txt, 3.txt)
// Afficher la concaténation dans l'ordre
// Résultat attendu "un deux trois"

const fs = require("fs");

async function main() {
  try {
    const contents = await Promise.all([
      fs.promises.readFile("1.txt", "utf8"), // Promise<r1>, 2s
      fs.promises.readFile("2.txt", "utf8"), // Promise<r2>, 1s
      fs.promises.readFile("3.txt", "utf8"), // Promise<r3>, 3s
    ]);
    console.log(contents);
  } catch (err) {
    // TODO handle error
  }
}

/*
async function main() {
  try {
    const p1 = fs.promises.readFile("1.txt", "utf8"); // Promise<r1>, 2s
    const p2 = fs.promises.readFile("2.txt", "utf8"); // Promise<r2>, 1s
    const p3 = fs.promises.readFile("3.txt", "utf8"); // Promise<r3>, 3s
    const content1 = await p1;
    const content2 = await p2;
    const content3 = await p3;
    console.log(content1, content2, content3);
  } catch (err) {
    // TODO handle error
  }
}
*/

main();
