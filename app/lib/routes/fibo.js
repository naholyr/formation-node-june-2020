"use strict";

const fibo = require("../fibo");

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
