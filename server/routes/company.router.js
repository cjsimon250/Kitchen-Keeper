const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  //Send back company object of the user that is currently logged in
  const queryText = `
    SELECT * FROM company WHERE user_id = $1`;

  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log("Error fetching company of user: ", error);
      res.sendStatus(500);
    });
});
module.exports = router;
