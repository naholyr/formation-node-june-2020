// Lire les 3 fichiers (1.txt, 2.txt, 3.txt)
// Afficher la concaténation dans l'ordre
// Résultat attendu "un deux trois"

const fs = require("fs");

try {
  const content1 = fs.readFileSync("1.txt", "utf8");
  const content2 = fs.readFileSync("2.txt", "utf8");
  const content3 = fs.readFileSync("3.txt", "utf8");
  console.log(content1, content2, content3);
} catch (err) {
  // TODO handle error
}
