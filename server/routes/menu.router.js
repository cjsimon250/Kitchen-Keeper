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

//Post new dish to the data base
router.post("/", rejectUnauthenticated, (req, res) => {
  //Get id of the company belonging to the user
  const queryText = `INSERT INTO menu (dish, price, image)
  VALUES ($1, $2, $3) RETURNING id;
  `;

  const dish = req.body.dish;
  const price = req.body.price;
  const image = req.body.image;
  const ingredients = req.body.ingredients;
  //Holding the returned menu id from first query
  let menuId = null;

  pool
    .query(queryText, [dish, price, image])
    .then((result) => {
      menuId = result.rows[0].id;
      for (ingredient of ingredients) {
        let queryText2 = `
      SELECT company_id from inventory WHERE company_id = $1 AND item = $2
      `;
        pool.query(queryText2, [ingredient.ingred]);
      }
    })
    .catch((error) => {
      console.log("Error executing SQL query", ":", error);
      res.sendStatus(500);
    });
});
module.exports = router;
