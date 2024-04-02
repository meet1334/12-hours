const fs = require("fs");
const express = require("express");
const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("product.json", "utf-8"));
const ProductData = data.products;
const createProducts = (req, res) => {
  console.log(req.body);
  ProductData.push(req.body);
  res.status(201).send(req.body);
};

const getAllProducts = (req, res) => {
  res.json(ProductData);
};

const getProduct = (req, res) => {
  const id = +req.params.id;
  const product = ProductData.find((p) => p.id === id);
  console.log(product);
  res.json(product);
};

const replaceProduct = (req, res) => {
  const id = +req.params.id;
  const productId = ProductData.findIndex((p) => p.id === id);
  const products = ProductData.splice(productId, 1, { ...req.body, id: id });
  res.status(201).send({ message: "product updated successfully" });
};

const updatedProduct = (req, res) => {
  const id = +req.params.id;
  const productId = ProductData.findIndex((p) => p.id === id);
  const product = ProductData[productId];
  const products = ProductData.splice(productId, 1, {
    ...product,
    ...req.body,
  });
  res.status(201).send({ message: "product updated successfully" });
};
const deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productId = ProductData.findIndex((p) => p.id === id);
  const products = ProductData.splice(productId, 1);
  res.status(201).send({ message: "product deleted successfully" });
};

module.exports = {
  createProducts,
  getProduct,
  getAllProducts,
  updatedProduct,
  replaceProduct,
  deleteProduct,
};
