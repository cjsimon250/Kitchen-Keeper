const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const nodeMailer = require("nodemailer");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
require("dotenv").config();

// GET user's team members
router.get("/", rejectUnauthenticated, (req, res) => {
  // GET route code here
});

//POST new team members
router.post("/", rejectUnauthenticated, async (req, res) => {
  console.log("REQ>BODY :", req.user);
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "kitchen.keeper.information@gmail.com",
      pass: gmailAppPassword,
    },
  });

  const mailOptions = {
    from: "kitchen.keeper.information@gmail.com",
    to: req.body.email,
    subject: "Team Invite",
    text: `${req.user.firstName} ${req.user.lastName} has invited you to join their`,
  };

  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log("Email sent: ", info.response);
  //     }
  //   });
});

module.exports = router;
