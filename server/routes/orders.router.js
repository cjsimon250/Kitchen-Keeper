const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const ordersQuery = `
    SELECT "orders".id, "orders".supplier, "orders".date,
    json_agg(json_build_object('item', "inventory".item, 'ordersId', "orders".id, 'quantity', "orders_inventory".quantity, 'unit', "orders_inventory".unit))
    AS "orderDetails"
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
  const connection = await pool.connect();

  try {
    connection.query("BEGIN");
    const companyId = req.user.companyId;
    const ordersQuery = `
    INSERT INTO "orders" (supplier, date, company_id)
    VALUES ($1, $2, $3) RETURNING id;
    `;
    let date = req.body.date;
    let supplier = req.body.supplier;
    let inventoryItems = req.body.inventoryItems;

    const ordersResult = await connection.query(ordersQuery, [
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

      //Converting quantity to oz or fluid oz for database
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

      await connection.query(ordersInventoryQuery, [
        item.inventoryId,
        ordersId,
        quantity,
        unit,
      ]);
    });
    await Promise.all(postOrderItems);

    // //Updating the amount of each inventory item from the order
    const updateInventory = inventoryItems.map(async (item) => {
      let orderQuantity = item.quantity;
      //Selecting quantity to add to
      const getQuantityQuery = `
      SELECT "inventory".quantity FROM "inventory" WHERE
      id = $1
      `;

      let currentQuantity = await connection.query(getQuantityQuery, [
        item.inventoryId,
      ]);

      let updatedQuantity =
        Number(currentQuantity.rows[0].quantity) + Number(orderQuantity);

      const updateInventoryQuery = `
    UPDATE "inventory" SET "quantity" = $1 WHERE id = $2
      `;

      await connection.query(updateInventoryQuery, [
        updatedQuantity,
        item.inventoryId,
      ]);
    });

    await Promise.all(updateInventory);
    res.sendStatus(200);

    await connection.query("COMMIT");
  } catch (error) {
    console.log("Error executing SQL query", ":", error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const ordersQuery = `
  DELETE FROM "orders" WHERE id = $1 AND company_id = $2
  `;

    await pool.query(ordersQuery, [req.params.id, companyId]);
    res.sendStatus(200);
  } catch (error) {
    console.log("Error executing SQL query", ":", error);
    res.sendStatus(500);
  }
});

module.exports = router;
