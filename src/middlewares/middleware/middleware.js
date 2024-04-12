
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
// const f= require("../../../public.key");
const publicKey = fs.readFileSync(path.join(__dirname, "../../../public.key"),"utf-8");
const authMiddleware = (req, res, next) => {
    try {
      const token = req?.get("Authorization")?.split("Bearer ")[1];
      console.log(token);
  
      // var decoded = jwt?.verify(token,process.env.SECRET_KEY );
  
      var decoded = jwt?.verify(token, publicKey);
      console.log(decoded);
      if (decoded.email) {
        next();
      } else {
        console.log("401 Unauthorized");
        res.sendStatus(401);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(401);
    }
  };


  module.exports = {authMiddleware}