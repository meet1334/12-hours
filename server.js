const express = require("express");
const morgan = require("morgan");
const server = express();
const productRouter = require("./src/routes/product");
const userRouter = require("./src/routes/user");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT ?? 8000;
const mongoose = require("mongoose");
// db connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("db connection established");
}

// Bodyparsers
server.use(express.json());
// server.use(morgan, "default");
// server.use(express.static("public"));

// routes
server.use("/api/products", productRouter.router);
server.use("/api/users", userRouter.router);

// listen server

server.listen(port, () => {
  console.log(process.env.PORT);
  console.log(`server started on port ${port}`);
});

module.exports = server;
