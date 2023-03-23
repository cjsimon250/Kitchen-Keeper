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
  }
});

//POST to new sales data
router.post("/", rejectUnauthenticated, async (req, res) => {
  //Get id of the company belonging to the user
  const companyQuery = `SELECT * FROM company WHERE user_id = $1;`;
  const result = await pool.query(companyQuery, [req.user.id]);

  let companyId = result.rows[0].id;
  const sales = req.body;
  //Mapping through the dish object
  const dishesList = Object.keys(sales.dishes);

  console.log("DISHES LIST :", dishesList);
  await Promise.all(
    dishesList.map(async (dish) => {
      const quantitySold = sales.dishes[dish].quantitySold;
      const menuId = sales.dishes[dish].quantitySold;

      //Inserting the total sales of the menu item into the database
      insertSalesQuery = `
      INSERT INTO "sales" (menu_id, date, "amountSold", company_id)
      VALUES($1, $2, $3, $4);
      `;

      await pool.query(insertSalesQuery, [
        menuId,
        sales.date,
        quantitySold,
        companyId,
      ]);

      //Getting the ingredients inside of the dish
      const selectIngredientQuery = `
      SELECT "menu_inventory".inventory_id, "menu_inventory".quantity FROM "menu_inventory"
      WHERE "menu_inventory".menu_id = $1;
      `;

      //Getting the id's of inventory items to subtract quantity from
      const menuIventoryResult = await pool.query(selectIngredientQuery, [
        menuId,
      ]);
      const inventoryData = menuIventoryResult.rows;

      console.log("INEVENTORY DATA : ", inventoryData);
      await Promise.all(
        inventoryData.map(async (inventoryObject) => {
          let inventoryId = inventoryObject.inventory_id;
          let quantityInDish = inventoryObject.quantity;

          // console.log("Inventory ID", inventoryId);
          // console.log("Quantity in Dish", quantityInDish);

          //Getting the current quantity if this item in the inventory
          const inventoryQuery = `
          SELECT "inventory".quantity FROM "inventory"
          WHERE id = $1;`;

          const inventoryResult = await pool.query(inventoryQuery, [
            inventoryId,
          ]);
          let quantityInStock = inventoryResult.rows[0].quantity;
          // console.log("Quantity in Stock", quantityInStock);

          //Determining the amount of a specific inventory item consumed
          let amountConsumed = quantityInDish * quantitySold;

          // console.log("Amount Consumed", amountConsumed);

          //Determing current stock of item after today's sales
          let newInventoryAmount = quantityInStock - amountConsumed;

          // console.log("NEW TOTAL :", newInventoryAmount);
          const updateInventoryQuery = `
        UPDATE "inventory" SET "quantity" = $1 WHERE id = $2
        `;

          await pool.query(updateInventoryQuery, [
            newInventoryAmount,
            inventoryId,
          ]);
        })
      );
    })
  );
});

module.exports = router;
