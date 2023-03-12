const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//Get all of the inventory associated with the user who is logged in
router.get("/", (req, res) => {
  //get id of the company belonging to the user
  const queryText = `SELECT * FROM company WHERE user_id = $1;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      const companyId = result.rows[0].id;
      const queryText2 = `SELECT * FROM inventory WHERE company_id = $1;`;

      return pool.query(queryText2, [companyId]);
    })
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log("Error executing SQL query", " : ", error);
      res.sendStatus(500);
    });
});

// Post new item to the inventory
router.post("/", (req, res) => {
  //get id of the company belonging to the user
  const queryText = `SELECT * FROM company WHERE user_id = $1;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      const companyId = result.rows[0].id;
      const queryText2 = `INSERT INTO inventory (company_id, item, quantity, "minimumStock", unit)
    VALUES ($1, $2, $3, $4, $5)
    `;

      const item = req.body.item;
      let quantity = req.body.quantity;
      let minimumStock = req.body.minimumStock;
      let unit;

      //converting quantity of item in stock to oz or fluid oz for database
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

      //converting quantity of minimum stock to oz or fluid oz for database
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
        case "Fl. Oz.":
          unit = "Fl. Oz";
          break;
      }

      return pool.query(queryText2, [
        companyId,
        item,
        quantity,
        minimumStock,
        unit,
      ]);
    })
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.log("Error executing SQL query", queryText, " : ", error);
      res.sendStatus(500);
    });
});
module.exports = router;
