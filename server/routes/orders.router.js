const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
});

//POST to order table
router.post("/", rejectUnauthenticated, async (req, res) => {
  try {
    //Get id of the company belonging to the user
    const companyQuery = `SELECT * FROM company WHERE user_id = $1;`;
    const result = await pool.query(companyQuery, [req.user.id]);

    let companyId = result.rows[0].id;

    const ordersQuery = `
    INSERT INTO "orders" (supplier, date, company_id)
    VALUES ($1, $2, $3) RETURNING id;
    `;
    let date = req.body.date;
    let supplier = req.body.supplier;
    let inventoryItems = req.body.inventoryItems;

    const ordersResult = await pool.query(ordersQuery, [
      supplier,
      date,
      companyId,
    ]);
    const ordersId = ordersResult.rows[0].id;

    const postOrderItems = inventoryItems.map(async (item) => {
      //Variable to hold the the unit so it can be converted if neccessary
      let unit = item.unit;
      //Variable to hold the the quantity so it can be converted if neccessary
      let quantity = item.quantity;
      const ordersInventoryQuery = `INSERT INTO orders_inventory (inventory_id, orders_id, quantity, unit)
      VALUES ($1, $2, $3, $4)
      `;

      //Converting quantity of item in stock to oz or fluid oz for database
      switch (unit) {
        case "Lb":
          quantity *= 16;
          unit = "Oz";
          break;
        case "Oz":
          unit = "Oz";
          break;
        case "Gal.":
          quantity *= 128;
          unit = "Fl. Oz";
          break;
        case "Fl. Oz.":
          unit = "Fl. Oz";
          break;
      }

      await pool.query(ordersInventoryQuery, [
        item.inventoryId,
        ordersId,
        item.quantity,
        unit,
      ]);
    });
    await Promise.all(postOrderItems);

    res.sendStatus(200);
  } catch (error) {
    console.log("Error executing SQL query", ":", error);
    res.sendStatus(500);
  }
});

module.exports = router;
