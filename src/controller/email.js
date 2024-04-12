const fs = require("fs");
const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const model = require("../model/user");
const User = model.User;
dotenv.config();

// get html content

const index = fs.readFileSync("emailcontent.html", "utf-8");

const modifiedIndex = index
  .replace("**Name**", "Meet Vaghasiya")
  .replace("**Company**", "Angel Brokerage Atkot")
  .replace("**Address**", "Kailash nagar ,Atkot,360040");

const sendEmail = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ _id: id }).populate("carts");
    const emails = [user.email];
    try {
        
      // Create a transporter using SMTP transport

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // port:465 if i use 465 then it will true
        auth: {
          user: process.env.GMAIL_EMAIL ?? "meet.vaghasiya.23.esb@gmail.com", //SENDER GMAIL ADDRESS
          pass: process.env.GMAIL_AUTH_TOKEN, //APP PSW FROM GMAIL ACCOUNT
        },
      });

      // Email data

      const mailOptions = {
        from: {
          name: "Angel Brokerage",
          address: process.env.GMAIL_EMAIL ?? "meet.vaghasiya.23.esb@gmail.com",
        },
        to: emails,
        subject: "ITR return file purpose",
        // text: 'This is a basic email sending from meet vaghasiya',
        html: modifiedIndex,
        attachments: [
          {
            filename: "SMB.pdf",
            path: path.join(__dirname, "../helper/SMB.pdf"),
            contentType: "application/pdf",
          },
          {
            filename: "SMB.jpg",
            path: path.join(__dirname, "../helper/SMB.jpg"),
            contentType: "image/jpg",
          },
        ],
      };

      // Send the email

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(404).send(error);
          console.error("Error sending email:", error);
        } else {
          res.status(200).send({ message: "Email sends successfully" });
          console.log(`Email sent to: ${emails[0]}`, info.response);
        }
      });
    } catch (error) {
      res.status(404).send(error);
      console.log(error);
    }
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

module.exports = { sendEmail };
