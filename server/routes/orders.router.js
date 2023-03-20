const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    //Get id of the company belonging to the user
    const companyQuery = `SELECT * FROM company WHERE user_id = $1;`;
    const companyResult = await pool.query(companyQuery, [req.user.id]);

    let companyId = companyResult.rows[0].id;
    const ordersQuery = `
SELECT "orders".id, "orders".supplier, "orders".date,
json_agg(json_build_object('item', "inventory".item, 'ordersId', "orders".id, 'quantity', "orders_inventory".quantity, 'unit', "orders_inventory".unit))
FROM "orders"
JOIN "orders_inventory" ON "orders_inventory".orders_id = "orders".id
JOIN "inventory" ON "orders_inventory".inventory_id = "inventory".id 
WHERE "orders".company_id = $1
GROUP BY "orders".id;
    `;

    const ordersResult = await pool.query(ordersQuery, [companyId]);
    res.send(ordersResult.rows);
  } catch (error) {
    console.log("Error executing SQL query", ":", error);
    res.sendStatus(500);
  }
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
