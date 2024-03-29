const http = require("http");
const fs = require("fs");

const data = fs.readFileSync("product.json", "utf-8");

const server = http.createServer((req, res) => {
  console.log(req.url);

  switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "application/json");
      res.end(data);
      break;
    case "/product":
      res.setHeader("Content-Type", "text/html");
      res.end(data);
      break;
    default:
      res.writeHead(404, "Not Found here");
      res.end(data);
  }
  console.log("server started");
//   res.setHeader("Content-Type", "application/json");
//   res.setHeader("dummt", "dummyjson");
});

server.listen(8080);
