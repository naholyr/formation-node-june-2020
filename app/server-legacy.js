const http = require("http");
const fibo = require("./fibo");

const handler = (request, response) => {
  response.setHeader("Content-Type", "text/plain");

  // Download
  /*
  const stream = fs.createReadStream('fichier')
  stream.pipe(response);
  */

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

  response.write("Bonjour");

  response.end();
};

const server = http.createServer(handler);

server.listen(3000);
