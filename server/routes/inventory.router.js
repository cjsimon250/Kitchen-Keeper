const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//Get all of the inventory associated with the user who is logged in
router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    const queryText = `SELECT * FROM inventory WHERE company_id = $1 ORDER BY item ASC;`;
    // Get the inventory items belonging to the user
    const result = await pool.query(queryText, [req.user.companyId]);

    // Converting quantities to be more readable if necessary
    let inventoryToSend = result.rows.map((item) => {
      let newItem = { ...item };
      if (
        item.unit === "Oz" &&
        (item.minimumStock >= 16 || item.quantity >= 16)
      ) {
        newItem.minimumStock = item.minimumStock / 16;
        newItem.quantity = item.quantity / 16;
        newItem.unit = "Lb";
      } else if (
        item.unit === "Fl. Oz" &&
        (item.minimumStock >= 128 || item.quantity >= 128)
      ) {
        newItem.minimumStock = item.minimumStock / 128;
        newItem.quantity = item.quantity / 128;
        newItem.unit = "Gal.";
      }
      return newItem;
    });
    res.send(inventoryToSend);
  } catch (error) {
    console.log("Error executing SQL query:", error);
    res.sendStatus(500);
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

    //Converting amounts to Oz or Fl. Oz for database
    if (unit === "Lb") {
      quantity *= 16;
      minimumStock *= 16;
      unit = "Oz";
    } else if (unit === "Gal") {
      quantity *= 128;
      minimumStock *= 128;
      unit = "Fl. Oz";
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

// UPDATE inventory
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  try {
    const queryText = `
      UPDATE inventory
      SET "${req.body.newItemData.field}" = $1
      WHERE id = ${req.body.newItemData.id}
    `;
    let newValue;

    switch (req.body.inventoryItemToUpdate.unit) {
      case "Lb":
        newValue = req.body.newItemData.value * 16;
        break;
      case "Gal.":
        newValue = req.body.newItemData.value * 128;
        break;
      default:
        newValue = req.body.newItemData.value;
        break;
    }

    await pool.query(queryText, [newValue]);
    res.sendStatus(204);
  } catch (error) {
    console.log("Error updating inventory:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
