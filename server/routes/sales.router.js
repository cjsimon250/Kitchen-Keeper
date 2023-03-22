const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//GET sales data from a specific timeframe
router.get("/monthly", rejectUnauthenticated, async (req, res) => {
  const queryText = `
  SELECT 
  DATE_TRUNC('month', "sales".date) AS "month",
  DATE_TRUNC('year', "sales".date) AS "year",
  SUM("amountSold" * "menu".price) AS "totalSales"
FROM "sales"
JOIN "menu" ON "sales".menu_id = "menu".id
WHERE "sales".date > $1 AND "sales".date < $2
GROUP BY "month", "year"
ORDER BY "year", "month" ASC;
    `;

  const salesData = await pool.query(queryText, [
    req.query.minDate,
    req.query.maxDate,
  ]);
  res.send(salesData.rows);
});

//GET sales data from a specific timeframe
router.get("/daily", rejectUnauthenticated, async (req, res) => {
  const queryText = `
  SELECT 
  DATE_TRUNC('day', "sales".date) AS "day",
  SUM("amountSold" * "menu".price) AS "totalSales"
FROM "sales"
JOIN "menu" ON "sales".menu_id = "menu".id
WHERE "sales".date > $1 AND "sales".date < $2
GROUP BY "day"
ORDER BY "day" ASC;
    `;

  const salesData = await pool.query(queryText, [
    req.query.minDate,
    req.query.maxDate,
  ]);
  res.send(salesData.rows);
});

//POST to order table
router.post("/", (req, res) => {
  //POST ROUTE
});

module.exports = router;
