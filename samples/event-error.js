const events = require("events");

const e = new events.EventEmitter();

e.on("error", function (err) {
  console.log("erreur", err);
});

e.emit("error", "coucou");
