"use strict";

const fibo = require("./fibo");
const jwt = require("jsonwebtoken");

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

exports.fibo = (ctx) => {
  const input = Number(ctx.params.number);

  ctx.assert(!isNaN(input), 404, "Invalid number in URL");
  // if (isNaN(number)) ctx.throw(404, '...');

  // Express:
  // if (isNaN(number)) return res.status(404).send('Invalid number in URL');

  const number = fibo(input);

  ctx.body = { input, output: number };

  // Express:
  // res.send({ input, output: number });
};

exports.login = async (ctx) => {
  // ctx.request, ctx.response => objets Koa
  // ctx.req, ctx.res => objets originaux module "http"
  const username = ctx.request.body.username;

  // TODO check dans redis si le username existe

  // TODO générer un JWT
  // pour retourner le token dans les futures requêtes: "Authentication: Bearer + token"
  const token = jwt.sign({ username }, "secret", { expiresIn: "24h" });

  // TODO renvoi au client le JWT
  ctx.body = { token };
};

exports.whoami = async (ctx) => {
  const token = ctx.request.query.token;
  // TODO check redis
  try {
    ctx.body = jwt.verify(token, "secret");
  } catch (err) {
    ctx.throw(403, err.message);
  }
};
