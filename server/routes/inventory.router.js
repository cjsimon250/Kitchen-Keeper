const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//Get all of the inventory associated with the user who is logged in
router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    const queryText = `SELECT * FROM inventory WHERE company_id = $1;`;
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
    let unit;

    //Converting quantity of item in stock to oz or fluid oz for database
    switch (req.body.inStockUnit) {
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

    //Converting quantity of minimum stock to oz or fluid oz for database
    switch (req.body.minimumStockUnit) {
      case "Lb":
        minimumStock *= 16;
        unit = "Oz";
        break;
      case "Oz":
        unit = "Oz";
        break;
      case "Gal.":
        minimumStock *= 128;
        unit = "Fl. Oz";
        break;
      case "Fl. Oz":
        unit = "Fl. Oz";
        break;
    }

    await pool.query(queryText, [
      req.user.companyId,
      item,
      quantity,
      minimumStock,
      unit,
    ]);
    res.sendStatus(201);
  } catch (error) {
    console.log("Error executing SQL query", ":", error);
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
    const id = req.body.payload.id;
    const companyId = req.user.companyId;
    let item = req.body.payload.item;
    let quantity = req.body.payload.quantity;
    let minimumStock = req.body.payload.minimumStock;
    let unit = req.body.payload.unit;

    //Converting quantity of item in stock to oz or fluid oz for database
    switch (quantity) {
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

    //Converting quantity of minimum stock to oz or fluid oz for database
    switch (minimumStock) {
      case "Lb":
        minimumStock *= 16;
        unit = "Oz";
        break;
      case "Oz":
        unit = "Oz";
        break;
      case "Gal.":
        minimumStock *= 128;
        unit = "Fl. Oz";
        break;
      case "Fl. Oz":
        unit = "Fl. Oz";
        break;
    }

    const queryText = `
  UPDATE "inventory" 
  SET item = $1, quantity = $2, "minimumStock" = $3, unit =$4
  WHERE id = $5 AND company_id = $6
  `;
    await pool.query(queryText, [
      item,
      quantity,
      minimumStock,
      unit,
      id,
      companyId,
    ]);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
    console.log("Error executing SQL Query :", error);
  }
});

module.exports = router;
