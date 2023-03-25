const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//GET sales data from a specific timeframe
router.get("/monthly", rejectUnauthenticated, async (req, res) => {
  try {
    //Get id of the company belonging to the user
    const companyQuery = `SELECT * FROM company WHERE user_id = $1;`;
    const result = await pool.query(companyQuery, [req.user.id]);

    let companyId = result.rows[0].id;
    const salesQuery = `
  SELECT 
  DATE_TRUNC('month', "sales".date) AS "month",
  DATE_TRUNC('year', "sales".date) AS "year",
  SUM("amountSold" * "menu".price) AS "totalSales"
  FROM "sales"
JOIN "menu" ON "sales".menu_id = "menu".id
WHERE "sales".date BETWEEN $1 AND $2 AND "sales".company_id = $3
GROUP BY "month", "year"
ORDER BY "year", "month" ASC;
    `;

    const salesData = await pool.query(salesQuery, [
      req.query.minDate,
      req.query.maxDate,
      companyId,
    ]);
    res.send(salesData.rows);
  } catch (error) {
    console.log("Error getting yearly sales :", error);
    res.sendStatus(500);
  }
});

//GET sales data from a specific timeframe
router.get("/daily", rejectUnauthenticated, async (req, res) => {
  try {
    //Get id of the company belonging to the user
    const companyQuery = `SELECT * FROM company WHERE user_id = $1;`;
    const result = await pool.query(companyQuery, [req.user.id]);

    let companyId = result.rows[0].id;
    const salesQuery = `
  SELECT 
  DATE_TRUNC('day', "sales".date) AS "day",
  SUM("amountSold" * "menu".price) AS "totalSales"
FROM "sales"
JOIN "menu" ON "sales".menu_id = "menu".id
WHERE "sales".date BETWEEN $1 AND $2 AND "sales".company_id = $3
GROUP BY "day"
ORDER BY "day" ASC;
    `;

    const salesData = await pool.query(salesQuery, [
      req.query.minDate,
      req.query.maxDate,
      companyId,
    ]);
    res.send(salesData.rows);
  } catch (error) {
    console.log("Error getting daily sales :", error);
    res.sendStatus(500);
  }
});

//POST to new sales data
router.post("/", rejectUnauthenticated, async (req, res) => {
  try {
    //Get id of the company belonging to the user
    const companyQuery = `SELECT id FROM company WHERE user_id = $1;`;
    const result = await pool.query(companyQuery, [req.user.id]);

    const companyId = result.rows[0].id;
    const sales = req.body;
    //Mapping through the dish object
    const dishesList = Object.keys(sales.dishes);

    await Promise.all(
      dishesList.map(async (dish) => {
        const quantitySold = sales.dishes[dish].quantitySold;
        const menuId = sales.dishes[dish].menuId;

        //Inserting the total sales of the menu item into the database
        const insertSalesQuery = `
        INSERT INTO "sales" (menu_id, date, "amountSold", company_id)
        VALUES($1, $2, $3, $4);
      `;
        await pool.query(insertSalesQuery, [
          menuId,
          sales.date,
          quantitySold,
          companyId,
        ]);

        //Updating the inventory
        const updateInventoryQuery = `
        UPDATE "inventory" SET "quantity" = "quantity" - (
          SELECT "menu_inventory".quantity * $1
          FROM "menu_inventory"
          WHERE "menu_inventory".menu_id = $2 AND "menu_inventory".inventory_id = "inventory".id
        )
        WHERE EXISTS (
          SELECT *
          FROM "menu_inventory"
          WHERE "menu_inventory".menu_id = $2 AND "menu_inventory".inventory_id = "inventory".id
        );
      `;
        await pool.query(updateInventoryQuery, [quantitySold, menuId]);
      })
    );

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

    let inventoryNotifications = inventoryNotificationResult.rows;

    res.send(inventoryNotifications);
  } catch (error) {
    console.log("Error posting sales :", error);
    res.sendStatus(500);
  }
});

module.exports = router;
