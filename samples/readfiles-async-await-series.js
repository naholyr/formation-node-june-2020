// Lire les 3 fichiers (1.txt, 2.txt, 3.txt)
// Afficher la concaténation dans l'ordre
// Résultat attendu "un deux trois"

const fs = require("fs");

async function main() {
  try {
    const content1 = await fs.promises.readFile("1.txt", "utf8"); // Promise<r1>, 2s
    const content2 = await fs.promises.readFile("2.txt", "utf8"); // Promise<r2>, 1s
    const content3 = await fs.promises.readFile("3.txt", "utf8"); // Promise<r3>, 3s
    console.log(content1, content2, content3);
  } catch (err) {
    // TODO handle error
  }
}

main();
