// Lire les 3 fichiers (1.txt, 2.txt, 3.txt)
// Afficher la concaténation dans l'ordre
// Résultat attendu "un deux trois"

const fs = require("fs");

// "asynchrone par callback"
fs.readFile("1.txt", "utf8", function (err, content) {
  // error-first callback
  if (err) {
    // TODO handle error
    return; // early return
  }
  fs.readFile("2.txt", "utf8", function (err, content2) {
    if (err) {
      // TODO handle error
      return;
    }
    fs.readFile("3.txt", "utf8", function (err, content3) {
      if (err) {
        // TODO handle error
        return;
      }
      console.log(content, content2, content3);
    });
  });
});
