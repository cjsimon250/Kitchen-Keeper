const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  // GET route code here
});

//POST to order table
router.post("/", rejectUnauthenticated, async (req, res) => {
  console.log("REQ BODY :", req.body);

  const queryText = `
  INSERT INTO "team" 
  VALUES($1, $2, $3, $4, $5);
  `;

  //   await pool.query(queryText, [req.body.])
});

module.exports = router;
