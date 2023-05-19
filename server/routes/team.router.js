const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
});

//POST to order table
router.post("/", (req, res) => {
  console.log("REQ BODY :", req.body);
});

module.exports = router;
