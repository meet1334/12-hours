const http = require("http");
const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("product.json", "utf-8"));
const product1 = data.products[0];
const product = data.products;

const server = http.createServer((req, res) => {
  console.log("server started");
  console.log(req.url);

  if (req.url.startsWith("/product")) {
    console.log(req.url);
    const prdId = req.url.split("/")[2];
    console.log(prdId);
    const productGet = product.find((p) => p.id === +prdId);
    console.log(productGet);
    res.setHeader("Content-Type", "text/html");
    const modifiedIndex = index
      .replace("**title**", productGet.title)
      .replace("**url**", productGet.thumbnail)
      .replace("**price**", productGet.price)
      .replace("**rating**", productGet.rating);
    res.end(modifiedIndex);
    return;
  }

  switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
      break;
    case "/product":
      res.setHeader("Content-Type", "text/html");
      const modifiedIndex = index
        .replace("**title**", product1.title)
        .replace("**url**", product1.thumbnail)
        .replace("**price**", product1.price)
        .replace("**rating**", product1.rating);
      res.end(modifiedIndex);
      break;
    default:
      res.writeHead(404, "Not Found here");
      res.end(JSON.stringify(data));
  }

  //   res.setHeader("Content-Type", "application/json");
  //   res.setHeader("dummt", "dummyjson");
});

server.listen(8080);
