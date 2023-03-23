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
    const queryText = `
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

    const salesData = await pool.query(queryText, [
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
    const queryText = `
  SELECT 
  DATE_TRUNC('day', "sales".date) AS "day",
  SUM("amountSold" * "menu".price) AS "totalSales"
FROM "sales"
JOIN "menu" ON "sales".menu_id = "menu".id
WHERE "sales".date BETWEEN $1 AND $2 AND "sales".company_id = $3
GROUP BY "day"
ORDER BY "day" ASC;
    `;

    const salesData = await pool.query(queryText, [
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
router.post("/", rejectUnauthenticated, (req, res) => {
  const sales = req.body;
  //Mapping through the dish object
  const dishesList = Object.keys(sales.dishes);
  dishesList.map(async (dish) => {
    //Get price of item
    const selectPriceQuery = `
      SELECT "price" from "menu" WHERE id = $1
  `;

    const menuResult = await pool.query(selectPriceQuery, [
      sales.dishes[dish].menuId,
    ]);

    //Price of this dish
    const price = menuResult.rows[0];
  });
});

module.exports = router;
