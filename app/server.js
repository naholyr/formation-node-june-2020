"use strict";

const config = require("config");
const routes = require("./lib/routes"); // ./lib/routes.js ou ./lib/routes/index.js
const http = require("http");
const Koa = require("koa");
const Router = require("@koa/router");
const serve = require("koa-static");
const koaBody = require("koa-body");
const socketIo = require("socket.io");
const socketIoRedisAdapter = require("socket.io-redis");
const websocket = require("./lib/websocket");
const chalk = require("chalk");

const app = new Koa();
const router = new Router();

router
  .get("/", routes.home)
  .get("/fibo/:number", routes.fibo.fibo)
  .post("/login", koaBody(), routes.auth.login)
  .get("/whoami", routes.auth.whoami)
  .get("/qs", (ctx) => {
    // ?x=1     => { x: "1" }
    // ?x=1&x=2 => { x: ["1", "2"] }
    // see https://github.com/koajs/qs
    ctx.body = ctx.request.query;
  });

app
  .use(async (ctx, next) => {
    const start = Date.now(); // ms
    await next();
    const duration = Date.now() - start;
    ctx.set("X-Response-Time", duration);
  })
  .use(serve("public"))
  .use(router.routes())
  .use(router.allowedMethods());

/*
app.use(async (ctx, next) => {
  const start = Date.now(); // ms
  await next();
  const duration = Date.now() - start;
  ctx.set("X-Response-Time", duration);
});

app.use((ctx, next) => {
  ctx.status = 200;
  ctx.body = fs.createReadStream("./common-words-5-10.js");
  ctx.set("content-type", "text/plain; charset=utf-8");
  next();
});

app.use((ctx, next) => {
  ctx.set("X-toto", "tata");
  next();
});
*/

const server = http.createServer(app.callback());

const io = socketIo(server);

// Cluster-friendly
io.adapter(socketIoRedisAdapter(config.redis));

io.on("connection", (socket) => {
  websocket(io, socket);
});

server.on("error", (err) => {
  console.error(err.message);
  process.exit(1);
});

if (module.parent) {
  // required: export server, don't start it immediately
  module.exports = server;
} else {
  // executed: start immediately
  server.listen(config.port, () => {
    console.log(
      chalk.bold.cyan("Server ready http://localhost:" + config.port)
    );
  });
}

/*
if (request.url.startsWith("/fibo/")) {
  const input = request.url.substring(6); // string
  const number = Number(input);
  if (isNaN(number)) {
    response.statusCode = 404;
    response.write("Invalid number in URL");
    return response.end();
  }
  const result = fibo(number); // number
  response.write(String(result));
  return response.end();
}
*/
