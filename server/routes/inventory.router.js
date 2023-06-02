const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//Get all of the inventory associated with the user who is logged in
router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    const queryText = `SELECT * FROM inventory WHERE company_id = $1 ORDER BY item ASC;
    `;
    //Get the inventory items belonging to the user
    const result = await pool.query(queryText, [req.user.companyId]);
    res.send(result.rows);
  } catch (error) {
    console.log(`Error executing SQL query :`, error);
  }
});

// Post new item to the inventory
router.post("/", rejectUnauthenticated, async (req, res) => {
  try {
    const queryText = `INSERT INTO inventory (company_id, item, quantity, "minimumStock", unit)
  VALUES ($1, $2, $3, $4, $5);
  `;

    const item = req.body.item;
    let quantity = req.body.quantity;
    let minimumStock = req.body.minimumStock;
    let unit = req.body.unit;

    await pool.query(queryText, [
      req.user.companyId,
      item,
      quantity,
      minimumStock,
      unit,
    ]);
    res.sendStatus(201);
  } catch (error) {
    console.log("Error executing SQL query :", error);
    res.sendStatus(500);
  }
});

//DELETE from inventory
router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  try {
    const queryText = `
    DELETE FROM "inventory" WHERE id = $1
    `;
    await pool.query(queryText, [req.params.id]);

    res.sendStatus(204);
  } catch (error) {
    console.log("Error executing SQL query", ":", error);
    res.sendStatus(500);
  }
});

//UPDATE inventory
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  try {
    const queryText = `
      UPDATE inventory
      SET "${req.body.field}" = $1
      WHERE id = $2
    `;
    await pool.query(queryText, [req.body.value, req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    console.log("Error updating inventory:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
