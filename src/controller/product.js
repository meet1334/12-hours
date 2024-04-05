const fs = require("fs");
const express = require("express");
const index = fs.readFileSync("index.html", "utf-8");
const model = require("../model/product");
const ejs = require("ejs");
const path = require("path");
const Product = model.Product;

const getAllProductsSSR = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products[0]);
    ejs.renderFile(
      path.resolve("../pages/index.ejs"),
      { product: products[0] },
      (err, resl) => {
        console.log("fdfsdmk");
        res.send(resl);
      }
    );
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

// Create

const createProducts = async (req, res) => {
  const products = new Product(req.body);
  products
    .save()
    .then((result) => {
      res
        .status(201)
        .send({ data: result, message: "data saved successfully" });
    })
    .catch((error) => {
      res
        .status(410)
        .send({ data: error, message: "data not saved successfully" });
    });

  // const result = await products.save();
  // res.status(201).send({data:result,message:"data saved successfully"})
};

// Read

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .send({ data: products, message: "Data fetched successfully" });
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const products = await Product.findOne({ _id: id });
    res
      .status(200)
      .send({ data: products, message: "Data fetched successfully" });
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

// Replace

const replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res
      .status(200)
      .send({ data: product, message: "Product replaced successfully" });
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

// Update

const updatedProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).send({
      data: product,
      messgae: "Product Updated successfully",
    });
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

// Delete

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.deleteOne({ _id: id });
    res
      .status(200)
      .send({ data: product, messgae: "Product Deleted successfully" });
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

module.exports = {
  createProducts,
  getProduct,
  getAllProducts,
  updatedProduct,
  replaceProduct,
  deleteProduct,
  getAllProductsSSR,
};
