const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
router.post("/register", async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);
    const company = req.body.company;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;

    const userQueryText = `INSERT INTO "user" (username, password, access, first_name, last_name, phone_number)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
    `;
    const userResponse = await pool.query(userQueryText, [
      username,
      password,
      3,
      firstName,
      lastName,
      phoneNumber,
    ]);

    const userId = userResponse.rows[0].id; // get the returned id value
    const companyQueryText = `INSERT INTO "company" (company)
        VALUES ($1) RETURNING id;
        `;
    const companyResponse = await pool.query(companyQueryText, [company]);
    const companyId = companyResponse.rows[0].id;
    const userCompanyQueryText = `
    INSERT INTO "user_company" (company_id, user_id)
    VALUES($1, $2)
    `;
    await pool.query(userCompanyQueryText, [companyId, userId]);
    res.sendStatus(201);
  } catch (error) {
    console.log("User registration failed: ", error);
    res.sendStatus(500);
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
