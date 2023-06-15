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
  const connection = await pool.connect();
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  try {
    connection.query("BEGIN");
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "kitchen.keeper.information@gmail.com",
        pass: gmailAppPassword,
      },
    });

    //Function to generate passkey
    function generateRandomSixDigitPasskey() {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let passkey = "";

      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        passkey += characters.charAt(randomIndex);
      }

      return passkey;
    }

    async function givePendingUserPasskey(randomPasskey) {
      try {
        const selectQuery = `
        SELECT * FROM "pending_users" WHERE email = $1
        `;

        const selectResponse = await connection.query(selectQuery, [
          req.body.email,
        ]);

        //If the user is already isn't already in the database create an entry for them
        //otherwise update their existing data
        if (selectResponse.rows.length === 0) {
          const insertQuery = `
            INSERT INTO "pending_users" (email, passkey, timestamp, company_id)
            VALUES($1, $2, $3, $4)
            `;
          await connection.query(insertQuery, [
            req.body.email,
            randomPasskey,
            new Date().toISOString(),
            req.user.companyId,
          ]);
        } else {
          const updateQuery = `
            UPDATE "pending_users" 
            SET passkey = $1, timestamp = $2
            WHERE email = $3
            `;

          await connection.query(updateQuery, [
            randomPasskey,
            new Date().toISOString(),
            req.body.email,
          ]);
        }
        return randomPasskey;
      } catch (error) {
        // Check if the error is a unique violation error
        if (error.code === "23505") {
          console.log("Unique constraint violated. Generating new passkey...");
          // Generating a new passkey
          const newPasskey = generateRandomSixDigitPasskey();
          await givePendingUserPasskey(newPasskey);
        } else {
          console.log("Error posting pending user: ", error);
        }
      }
    }

    // Generate new passkey
    let randomPasskey = generateRandomSixDigitPasskey();
    let passkey = await givePendingUserPasskey(randomPasskey);

    const mailOptions = {
      from: "kitchen.keeper.information@gmail.com",
      to: req.body.email,
      subject: "Team Invite",
      html: `
          <p>Hello ${req.body.name},</p>
          <p>${req.user.first_name} ${req.user.last_name} from ${req.user.companyName}
          has invited you to join their team. Click the button below to proceed:</p>
          <p>This is the passkey needed to create your account</p>
          <h3>${passkey}</h3>
          <p>
            <a href="http://localhost:3000/#/" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #bacc81; color: #ffffff; text-decoration: none; border-radius: 4px;">Register Now</a>
          </p>
          <p>Thank you!</p>
          `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });

    connection.query("COMMIT");
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    console.log("Error with query for new team member: ", error);
  }
});

module.exports = router;
