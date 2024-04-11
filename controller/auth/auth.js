const express = require("express");
const model = require("../../model/user");
const ejs = require("ejs");
const User = model.User;
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const privateKey = fs.readFileSync(
  path.join(__dirname, "../../private.key"),
  "utf-8"
);
const bcrypt = require("bcrypt");

const signUpUser = async (req, res) => {
  const users = new User(req.body);
  //jwt token simple
  //   var token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);

  // private-public key
  const token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });
  const hash = bcrypt.hashSync(req.body.password.toString(), 10);
  console.log(hash);
  console.log(token, "786 786");
  users.password = hash;
  users.token = token;
  users
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
};

const loginUser = async (req, res) => {
    console.log(req.body);
    try {
      const doc = await User.findOne({ email: req.body.email });
      const isAuth = bcrypt.compareSync(
        req.body.password.toString(),
        doc.password
      );
      if (isAuth) {
        const token = jwt.sign({ email: req.body.email }, privateKey, {
          algorithm: "RS256",
        });
        doc.token = token;
        doc
          .save()
          .then(() => {
            res.status(200).json({ token });
          })
          .catch((error) => {
            res
              .status(410)
              .send({ data: error, message: "Invalid login attempt" });
          });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      res.status(401).send(error);
      console.log(error);
    }
  };

module.exports = {
    signUpUser,loginUser
};
