const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    // Holding all inventory id's that match the user's company id
    let inventoryIds = [];
    // Holding all Menu items and the ingredient data from menu_inventory, menu, inventory
    let ingredientsData = [];
    // Variable to send back to the client
    let menuDataToSend = [];

    // Get id of the company belonging to the user
    const queryText = `SELECT * FROM company WHERE user_id = $1;`;
    const companyResult = await pool.query(queryText, [req.user.id]);
    const companyId = companyResult.rows[0].id;

    // Getting id's from inventory that belong to the user's company
    const queryText2 = `SELECT id from inventory WHERE company_id = $1;`;
    const inventoryResult = await pool.query(queryText2, [companyId]);

    // Setting variable to be looped through
    inventoryIds = inventoryResult.rows;

    // Mapping through the array of inventory id's belonging to user in order to return
    // all the different dishes the user has plus the ingredient information about that dish
    await Promise.all(
      inventoryIds.map(async (inventoryId) => {
        let queryText3 = `
          SELECT "menu_inventory".id as "menuInventoryId", "menu_inventory".quantity, "menu_inventory".unit,
          "inventory".item, "menu".id AS "menuId", "menu".dish, "menu".price, "menu".image 
          FROM "menu"
          JOIN "menu_inventory" ON "menu".id = "menu_inventory".menu_id
          JOIN "inventory" ON "inventory".id = "menu_inventory".inventory_id
          WHERE "menu_inventory".inventory_id = $1
        `;

        const menuInventoryResult = await pool.query(queryText3, [
          inventoryId.id,
        ]);
        if (menuInventoryResult.rows.length > 0) {
          ingredientsData = [...ingredientsData, menuInventoryResult.rows[0]];
        }
      })
    );

    // Filtering the data so that all of the ingredient information is
    // easier to access by item on the client side
    menuDataToSend = ingredientsData.reduce((accumulator, current) => {
      // Checking if there is already an object for current dish
      const existingDish = accumulator.find(
        (item) => item && item.dish === current.dish
      );

      // If there is an object for current dish, push the current ingredient
      // information to the ingredient array of that object
      if (existingDish) {
        existingDish.ingredients.push({
          MenuInventoryid: current.menuInventoryId,
          quantity: current.quantity,
          unit: current.unit,
          item: current.item,
        });
        // If there isn't an object for the current dish,
        // create new object and push to the array
      } else {
        accumulator.push({
          inventoryId: current.inventoryId,
          menuId: current.menuId,
          dish: current.dish,
          price: current.price,
          image: current.image,
          ingredients: [
            {
              menuInventoryId: current.menuInventoryId,
              quantity: current.quantity,
              unit: current.unit,
              item: current.item,
            },
          ],
        });
      }

      return accumulator;
    }, []);
    res.send(menuDataToSend);
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
    const insertQueryText = `INSERT INTO menu (dish, price, image)
      VALUES ($1, $2, $3) RETURNING id;`;
    const menuResult = await pool.query(insertQueryText, [dish, price, image]);
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
module.exports = router;
