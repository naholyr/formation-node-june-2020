nsalaireP = travailler(); // Promise<Euros>

xboxP = salaireP.then(function (euros) {
  return acheter("xbox", euros); // Xbox
}); // Promise<Xbox>

jeuP = xboxP.catch(function () {
  return acheter("puzzle");
});

tempsDeJeuAvecMonFilsP = jeuP.then(function (xbox) {
  return xbox.jouer("1 heure");
});

bisouP = tempsDeJeuAvecMonFilsP.then(function () {
  return "bisou";
});

promiseOfBisou = travailler() // Promise<Euros>
  .then(function (euros) {
    return acheter("xbox", euros); // Xbox
  }) // Promise<Xbox>
  .catch(function (err) {
    return acheter("puzzle"); // Jeu
  }) // Promise<Jeu>
  .then(function (jeu) {
    return jeu.jouer("1 heure");
  }) // Promise<Jeu>
  .then(function () {
    return "bisou";
  }); // Promise<Bisou>

promiseOfBisou = travailler() // Promise<Euros>
  .then((euros) => acheter("xbox", euros)) // Promise<Xbox>
  .catch((err) => acheter("puzzle")) // Promise<Jeu>
  .then((jeu) => jeu.jouer("1 heure")) // Promise<Jeu>
  .then(() => "bisou"); // Promise<Bisou>
