const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    // Get id of the company belonging to the user
    const queryText = `SELECT * FROM company WHERE user_id = $1;`;
    const companyResult = await pool.query(queryText, [req.user.id]);
    const companyId = companyResult.rows[0].id;

    const selectMenuQuery = `
    SELECT "menu".dish, "menu".id, "menu".image, "menu".price, 
    json_agg(json_build_object('inventoryId', "inventory".id,'item', "inventory".item, 'quantity', "menu_inventory".quantity, 'unit', "menu_inventory".unit)) AS "ingredients" 
    FROM "menu"
    JOIN "menu_inventory" ON "menu".id = "menu_inventory".menu_id
    JOIN "inventory" ON "inventory".id = "menu_inventory".inventory_id
    WHERE "menu".company_id = $1
    GROUP BY "menu".id
    
        `;

    const menuDataToSend = await pool.query(selectMenuQuery, [companyId]);
    res.send(menuDataToSend.rows);
  } catch (error) {
    console.log("Error executing SQL query", ":", error);
    res.sendStatus(500);
  }
});

//POST new dish to the data base
router.post("/", rejectUnauthenticated, async (req, res) => {
  const dish = req.body.dish;
  const price = req.body.price;
  const image = req.body.image;
  const ingredients = req.body.ingredients;
  let companyId = null;
  //Holding the returned menu id from first query
  let menuId = null;
  //Holding the returned id's from the inventory
  let inventoryIds = [];
  //Counter variable to increase everytime ingredients is mapped through
  let ingredientsIndex = -1;

  try {
    //Get id of the company belonging to the user
    const queryText = `SELECT * FROM company WHERE user_id = $1;`;
    const companyResult = await pool.query(queryText, [req.user.id]);
    companyId = companyResult.rows[0].id;

    //Insert data into the menu table and return the id of the menu item
    const insertQueryText = `INSERT INTO menu (dish, price, image, company_id)
      VALUES ($1, $2, $3, $4) RETURNING id;`;
    const menuResult = await pool.query(insertQueryText, [
      dish,
      price,
      image,
      companyId,
    ]);
    //Setting the returned id of new menu item to be used later
    menuId = menuResult.rows[0].id;

    //Loop through the array of objects and get the inventory id of that item
    const getInventoryIds = ingredients.map(async (ingredient) => {
      let queryText2 = `
          SELECT id FROM inventory WHERE company_id = $1 AND item = $2;
          `;
      const inventoryResult = await pool.query(queryText2, [
        companyId,
        ingredient.ingredientName,
      ]);
      inventoryIds = [...inventoryIds, inventoryResult.rows[0].id];
    });
    await Promise.all(getInventoryIds);

    //Loop through the array of ingredient object and post all ingredients
    //to menu_inventory with the inventory id's
    const postIngredients = ingredients.map(async (ingredient) => {
      ingredientsIndex++;
      //Variable to hold the the unit so it can be converted if neccessary
      let unit = ingredient.unit;
      //Variable to hold the the quantity so it can be converted if neccessary
      let quantity = ingredient.quantity;
      let queryText3 = `
            INSERT INTO menu_inventory (menu_id, inventory_id, quantity, unit)
            VALUES ($1, $2, $3, $4);
            `;

      //Converting quantity of item in stock to oz or fluid oz for database
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

      await pool.query(queryText3, [
        menuId,
        inventoryIds[ingredientsIndex],
        quantity,
        unit,
      ]);
    });
    await Promise.all(postIngredients);

    //Resetting ingredientsIndex counter
    ingredientsIndex = -1;

    res.sendStatus(200);
  } catch (error) {
    console.log("Error executing SQL query", ":", error);
    res.sendStatus(500);
  }
});

//UPDATE a menu item
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  try {
    //Get id of the company belonging to the user
    const queryText = `SELECT * FROM company WHERE user_id = $1;`;
    const companyResult = await pool.query(queryText, [req.user.id]);
    const companyId = companyResult.rows[0].id;

    //New menu item data
    const updatedMenuItem = req.body.payload;
    const dish = updatedMenuItem.dish;
    const price = updatedMenuItem.price;
    const image = updatedMenuItem.image;
    //Array of new information
    const ingredients = updatedMenuItem.ingredients;

    const updateMenuQuery = `
  UPDATE menu SET "dish" = $1, price = $2, image = $3, company_id = $4 WHERE id = $5
  `;
    await pool.query(updateMenuQuery, [
      dish,
      price,
      image,
      companyId,
      req.params.id,
    ]);

    const clearMenuInventoryQuery = `
    DELETE FROM "menu_inventory" WHERE "menu_id" = $1
    `;
    await pool.query(clearMenuInventoryQuery, [req.params.id]);

    const updateMenuInventory = ingredients.map(async (ingredient) => {
      const updateMenuInventoryQuery = `
    INSERT INTO menu_inventory (menu_id, inventory_id, quantity, unit)
    VALUES ($1, $2, $3, $4);
    `;
      return pool.query(updateMenuInventoryQuery, [
        req.params.id,
        ingredient.inventoryId,
        ingredient.quantity,
        ingredient.unit,
      ]);
    });
    await Promise.all(updateMenuInventory);
    res.sendStatus(200);
  } catch (error) {
    console.log("Error executing SQL query", ":", error);
    res.sendStatus(500);
  }
});

router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  try {
    const queryText = `DELETE FROM "menu" WHERE "id" = $1`;

    await pool.query(queryText, [req.params.id]);
    res.sendStatus(200);
  } catch (error) {
    console.log("Error executing SQL query", ":", error);
    res.sendStatus(500);
  }
});
module.exports = router;
