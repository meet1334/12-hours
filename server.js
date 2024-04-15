const express = require("express");
const morgan = require("morgan");
const server = express();
const cors = require("cors");
const path = require("path");
const productRouter = require("./src/routes/product");
const userRouter = require("./src/routes/user");
const authRouter = require("./src/routes/auth");
const otherRouter = require("./src/routes/email");
const socketRouter = require("./src/routes/socket");
const dotenv = require("dotenv");
const ejs = require("ejs");
const multer = require("multer");

// SOCKET IO HTTP Server ====================================================

const http = require("http");
const chatServer = http.createServer(server);
const { Server } = require("socket.io");
const io = new Server(chatServer);

io.on("connection", (client) => {
  // Receivig the message :

  client.on("user-message", (msg) => {
    // Again Send to HTML client

    io.emit("message", ` Server sending : ${msg}`);
    console.log("New Message Receive:", msg);
  });
  console.log("New  user connected: connection ID", client.id);
});

//============================================================================

dotenv.config();

const port = process.env.PORT ?? 8000;
const public_dir = process.env.PUBLIC_DIR ?? "public";
const mongoose = require("mongoose");
const { authMiddleware } = require("./src/middlewares/middleware/middleware");

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

// SOCKET IO SEVER CONNECTION

server.use("/chat", socketRouter.router);

server.use("/api", authRouter.router);
server.use("/api/", otherRouter.router);
server.use("/api/products", authMiddleware, productRouter.router);

// excel downloading with out auth gard

server.use("/api/users", authMiddleware, userRouter.router);

// listen server

// server.listen(port, () => {
//   console.log(process.env.PORT);
//   console.log(`server started on port ${port}`);
// });

// SOCKET IO SEVER CONNECTION

server.use(express.static(path.resolve("./public")));

chatServer.listen(port, () => {
  console.log(`server started on port ${port}`);
});

module.exports = server;
