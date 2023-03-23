const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//Get low quantity items
router.get("/", async (req, res) => {
  try {
    //Get id of the company belonging to the user
    const companyQuery = `SELECT * FROM company WHERE user_id = $1;`;
    const result = await pool.query(companyQuery, [req.user.id]);

    let companyId = result.rows[0].id;
    //Query to select all inventory items that are below the specified minimum stock
    const inventoryNotificationQuery = `
  SELECT "inventory".item, "inventory".quantity, "inventory".unit FROM "inventory"
   WHERE "inventory".quantity < "inventory"."minimumStock"
   AND "inventory".company_id = $1;
  `;

    const inventoryNotificationResult = await pool.query(
      inventoryNotificationQuery,
      [companyId]
    );
    res.send(inventoryNotificationResult.rows);
  } catch (error) {
    res.sendStatus(500);
    console.log("Error fetching low quantity items");
  }
});

module.exports = router;
