const fs = require("fs");
const express = require("express");
// const index = fs.readFileSync("index.html", "utf-8");
const model = require("../model/user");
const ejs = require("ejs");
const path = require("path");
const User = model.User;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Create

// const createUsers = async (req, res) => {
//   const users = new User(req.body);
//   var token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
//   users.token = token;
//   users
//     .save()
//     .then((result) => {
//       res
//         .status(201)
//         .send({ data: result, message: "data saved successfully" });
//     })
//     .catch((error) => {
//       res
//         .status(410)
//         .send({ data: error, message: "data not saved successfully" });
//     });
// };

// Read

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ data: users, message: "Data fetched successfully" });
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const users = await User.findOne({ _id: id });
    res.status(200).send({ data: users, message: "Data fetched successfully" });
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

// Replace

const replaceUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).send({ data: user, message: "Data replaced successfully" });
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

// Update

const updatedUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).send({ data: user, message: "Data updated successfully" });
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

// Delete

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.deleteOne({ _id: id });
    res.status(200).send({ data: user, message: "Data deleted successfully" });
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

module.exports = {
  // createUsers,
  getAllUsers,
  getUsers,
  updatedUser,
  replaceUser,
  deleteUser,
};
