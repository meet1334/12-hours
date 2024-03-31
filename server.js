const express = require("express");
const morgan = require("morgan");
const server = express();
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

// Bodyparsers
server.use(express.json());
// server.use(morgan, "default");
// server.use(express.static("public"));

// routes
server.use("/api/products", productRouter.router);
server.use("/api/users", userRouter.router);

server.listen(8080, () => {
  console.log("server started");
});

module.exports = server;
