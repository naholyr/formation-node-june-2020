// Lire les 3 fichiers (1.txt, 2.txt, 3.txt)
// Afficher la concaténation dans l'ordre
// Résultat attendu "un deux trois"

const fs = require("fs");

let content1 = null;
let content2 = null;
let content3 = null;

// "asynchrone par callback"
fs.readFile("1.txt", "utf8", function (err, content) {
  // error-first callback
  if (err) {
    // TODO handle error
    return; // early return
  }
  content1 = content;
  afterRead();
});

fs.readFile("2.txt", "utf8", function (err, content) {
  if (err) {
    // TODO handle error
    return;
  }
  content2 = content;
  afterRead();
});

fs.readFile("3.txt", "utf8", function (err, content) {
  if (err) {
    // TODO handle error
    return;
  }
  content3 = content;
  afterRead();
});

function afterRead() {
  if (content1 !== null && content2 !== null && content3 !== null) {
    console.log(content1, content2, content3);
  }
}
