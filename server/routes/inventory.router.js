const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//Get all of the inventory associated with the user who is logged in
router.get("/", (req, res) => {
  //get id of the company belonging to the user
  const queryText = `SELECT * FROM company WHERE user_id = $1;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      const companyId = result.rows[0].id;
      const queryText2 = `SELECT * FROM inventory WHERE company_id = $1;`;

      return pool.query(queryText2, [companyId]);
    })
    .then(() => res.sendStatus(200))
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
