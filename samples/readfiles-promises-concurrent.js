// Lire les 3 fichiers (1.txt, 2.txt, 3.txt)
// Afficher la concaténation dans l'ordre
// Résultat attendu "un deux trois"

const fs = require("fs");

const p1 = fs.promises.readFile("1.txt", "utf8"); // Promise<r1>, 2s
const p2 = fs.promises.readFile("2.txt", "utf8"); // Promise<r2>, 1s
const p3 = fs.promises.readFile("3.txt", "utf8"); // Promise<r3>, 3s

// Promise.all :: Array<Promise<X>> => Promise<Array<X>>
Promise.all([p1, p2, p3]) // Promise<[r1, r2, r3]>
  .then(function (contents) {
    console.log(contents);
  })
  .catch(function (err) {
    // TODO handle error
  });

/*
// T+0

p1.then(function (content1) {
  // T+2
  console.log(content1);
  return p2; // résolue depuis 1s
})
  .then(function (content2) {
    // T+2
    console.log(content2);
    return p3; // résolue dans 1s
  })
  .then(function (content3) {
    // T+3
    console.log(content3);
  })
  .catch(function (err) {
    // TODO handle error
  });
*/
