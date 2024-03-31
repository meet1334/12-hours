const http = require("http");
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const server = express();

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("product.json", "utf-8"));

server.use(express.json());

// for using to access public files... added files in public folder
server.use(express.static("public"));

// API ENDPOINTS

// Create post Apis to add products Create POST /products

server.post("/products", (req, res) => {
  console.log(req.body);
  data.products.push(req.body);
  res.status(201).send(req.body);
});

// Read GET APIS
server.get("/products", (req, res) => {
  res.json(data);
});

server.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = data.products.find((p) => p.id === id);
  console.log(product);
  res.json(product);
});

// Update  PUT product

server.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productId = data.products.findIndex((p) => p.id === id);
  const products = data.products.splice(productId, 1, { ...req.body, id: id });
  res.status(201).send({ message: "product updated successfully" });
});

// Update  PATCH product

server.patch("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productId = data.products.findIndex((p) => p.id === id);
  const product = data.products[productId];
  const products = data.products.splice(productId, 1, {
    ...product,
    ...req.body,
  });
  res.status(201).send({ message: "product updated successfully" });
});

// Delete  DELETE

server.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productId = data.products.findIndex((p) => p.id === id);
  const products = data.products.splice(productId, 1);
  res.status(201).send({ message: "product deleted successfully" });
});

server.listen(8080, () => {
  console.log("server 8080 is on");
});
