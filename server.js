const express = require("express");
const morgan = require("morgan");
const server = express();
const cors = require("cors");
const path = require("path");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const dotenv = require("dotenv");
const ejs = require("ejs");
dotenv.config();
const port = process.env.PORT ?? 8000;
const public_dir = process.env.PUBLIC_DIR ?? "public";
const mongoose = require("mongoose");
// db connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("db connection established");
}

// Bodyparsers
server.use(express.json());
server.use(express.urlencoded());
server.use(cors());
// server.use(morgan, "default");
server.use(express.static(path.resolve(__dirname, public_dir)));

// routes
server.use("/api/products", productRouter.router);
server.use("/api/users", userRouter.router);

// listen server

server.listen(port, () => {
  console.log(process.env.PORT);
  console.log(`server started on port ${port}`);
});

module.exports = server;
