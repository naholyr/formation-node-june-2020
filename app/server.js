const routes = require("./lib/routes");
const http = require("http");
const Koa = require("koa");
const Router = require("@koa/router");
const serve = require("koa-static");
const koaBody = require("koa-body");
const socketIo = require("socket.io");

const app = new Koa();
const router = new Router();

router
  .get("/", routes.home)
  .get("/fibo/:number", routes.fibo)
  .post("/login", koaBody(), routes.login)
  .get("/whoami", routes.whoami)
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

const fibo = require("./lib/fibo");
io.on("connection", (socket) => {
  socket.emit("coucou");
  setTimeout(() => socket.emit("coucou"), 5000);
  setTimeout(() => socket.emit("coucou"), 10000);

  socket.on("fibo", (n) => {
    socket.emit("fibo-result", fibo(n));
  });

  socket.on("fibo2", (n, cb) => {
    cb(fibo(n));
  });
});

server.listen(3000);

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
