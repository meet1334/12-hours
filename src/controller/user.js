const fs = require("fs");
const express = require("express");
// const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("product.json", "utf-8"));
const UserData = data.users;
const createUsers = (req, res) => {
  console.log(req.body);
  UserData.push(req.body);
  res.status(201).send(req.body);
};

const getAllUsers = (req, res) => {
  res.json(UserData);
};

const getUsers = (req, res) => {
  const id = +req.params.id;
  const user = UserData.find((p) => p.id === id);
  console.log(user);
  res.json(user);
};

const replaceUser = (req, res) => {
  const id = +req.params.id;
  const userId = UserData.findIndex((p) => p.id === id);
  const users = UserData.splice(userId, 1, { ...req.body, id: id });
  res.status(201).send({ message: "user updated successfully" });
};

const updatedUser = (req, res) => {
  const id = +req.params.id;
  const userId = UserData.findIndex((p) => p.id === id);
  const user = UserData[userId];
  const users = UserData.splice(userId, 1, {
    ...user,
    ...req.body,
  });
  res.status(201).send({ message: "user updated successfully" });
};
const deleteUser = (req, res) => {
  const id = +req.params.id;
  const userId = UserData.findIndex((p) => p.id === id);
  const users = UserData.splice(userId, 1);
  res.status(201).send({ message: "user deleted successfully" });
};

module.exports = {
  createUsers,
  getAllUsers,
  getUsers,
  updatedUser,
  replaceUser,
  deleteUser,
};
