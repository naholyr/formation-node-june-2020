"use strict";

const fibo = require("./fibo");
const auth = require("./auth");

/*
export global:
module.exports = { home: ..., fibo: ... }

exports nommés:
exports.home = ...
exports.fibo = ...
*/

exports.home = (ctx) => {
  console.log("GET /");
  ctx.body = "Bonjour !";
  // Express:
  // res.send("Bonjour!")
};

exports.fibo = fibo; // { fibo }
exports.auth = auth; // { login, whoami }
