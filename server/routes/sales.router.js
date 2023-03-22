const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//GET sales data from a specific timeframe
router.get("/", rejectUnauthenticated, async (req, res) => {
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

  const salesByMonth = await pool.query(queryText, [
    req.query.minDate,
    req.query.maxDate,
  ]);
  console.log(req.query.minDate);
  res.send(salesByMonth.rows);
});

//POST to order table
router.post("/", (req, res) => {
  //POST ROUTE
});

module.exports = router;
