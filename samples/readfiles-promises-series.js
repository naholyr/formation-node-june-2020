// Lire les 3 fichiers (1.txt, 2.txt, 3.txt)
// Afficher la concaténation dans l'ordre
// Résultat attendu "un deux trois"

const fs = require("fs");

// synchrone: fs.readFileSync(fichier, encodage) // string
// asynchrone par cb: fs.readFile(fichier, encodage, callback) // void
// promise: fs.promises.readFile(fichier, encodage) // Promise<string>

fs.promises
  .readFile("1.txt", "utf8") // T+0 (temps de lecture 1.txt = 2s)
  .then(function (content1) {
    // T+2
    console.log(content1);
    return fs.promises.readFile("2.txt", "utf8"); // temps de lecture 2.txt = 1s
  })
  .then(function (content2) {
    // T+3
    console.log(content2);
    return fs.promises.readFile("3.txt", "utf8"); // temps = 3s
  })
  .then(function (content3) {
    // T+6
    console.log(content3);
  });

/*
fs.promises
  .readFile("1.txt", "utf8")
  .then(function (content1) {
    return fs.promises
      .readFile("2.txt", "utf8") // Promise<content2>
      .then(function (content2) {
        return [content1, content2];
      });
  }) // Promise<Array<string>>
  .then(function (contents) {
    return fs.promises
      .readFile("3.txt", "utf8") // Promise<content3>
      .then(function (content3) {
        return [...contents, content3];
      });
  }) // Promise<Array<string>>
  .then(function (contents) {
    console.log(contents);
  });
*/
