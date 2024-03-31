const http = require("http");
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const server = express();

const index = fs.readFileSync("index.html", "utf-8");
const data = fs.readFileSync("product.json", "utf-8");

// MIDDLEWARE

// server.use((req, res, next) => {
//   console.log(req.method, req.ip, req.hostname, req.get("User-Agent"));
//   next();
// });

// use for body payload json access ... before this we can use bodyparser for access this payload

server.use(express.json());

// for using to access public files... added files in public folder
server.use(express.static("public"));

// 3rd party morgan use for middleware
//dev is mothod for data to get
// server.use(morgan("dev"));
server.use(morgan("default"));
// custome middleware

const auth = (req, res, next) => {
  console.log(req.query);
  if (req.body.password === "123") {
    next();
  } else {
    res.sendStatus(401);
  }
};

// server.use(auth);
// API ENDPOINTS

server.get("/product/:id", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});
server.get("/", auth, (req, res) => {
  res.send({ type: "GET" });
});
server.post("/", auth, (req, res) => {
  res.json({ type: "post" });
});
server.put("/", (req, res) => {
  res.json({ type: "put" });
});
server.delete("/", (req, res) => {
  res.json({ type: "delete" });
});
server.patch("/", (req, res) => {
  res.json({ type: "patch" });
});

server.get("/demo", (req, res) => {
  res.status(300).json(data);
  // res.sendStatus(400);
  // res.send("data");
  // res.sendFile(`E:/Tech/12 hours/12-hours/index.html`);
  console.log("server is called");
});

server.listen(8080, () => {
  console.log("server 8080 is on");
});
