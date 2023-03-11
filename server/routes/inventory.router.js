const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
  const sqlText = `SELECT * FROM item`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error executing SQL query", sqlText, " : ", err);
      res.sendStatus(500);
    });
});

// /**
//  * POST route template
//  */
// router.post('/', (req, res) => {
//   // POST route code here
// });

module.exports = router;
