const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//GET Menu Items
router.get("/", rejectUnauthenticated, (req, res) => {
  //Holding all inventory id's that match the user's company id
  let inventoryIds = [];
  //Holding all objects returned from menu_inventory (ingredients information)
  let ingredients = [];
  //Holding all Menu items and the ingredient data
  let ingredientsData = [];

  //Get id of the company belonging to the user
  const queryText = `SELECT * FROM company WHERE user_id = $1;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      const companyId = result.rows[0].id;
      //Getting id's from inventory that belong to the user's company
      const queryText2 = `SELECT id from inventory WHERE company_id = $1;`;

      pool
        .query(queryText2, [companyId])
        .then((result) => {
          //Setting variable to be looped through
          inventoryIds = result.rows;
          //Mapping through the array of inventory id's belonging to user in order to return
          //all the different dishes the user has plus the ingredient information about that dish
          return Promise.all(
            inventoryIds.map((inventoryId) => {
              let queryText4 = `
              SELECT "menu_inventory".id, "menu_inventory".quantity, "menu_inventory".unit,
               "inventory".item, "menu".dish, "menu".price, "menu".image 
              FROM "menu"
              JOIN "menu_inventory" ON "menu".id = "menu_inventory".menu_id
              JOIN "inventory" ON "inventory".id = "menu_inventory".inventory_id
              WHERE "menu_inventory".inventory_id = $1
              `;

              return pool.query(queryText4, [inventoryId.id]).then((result) => {
                ingredientsData = [...ingredientsData, result.rows[0]];
              });
            })
          );
        })
        .then((result) => {
          console.log(` IngredientsData :`, ingredientsData);
        });
    })
    .catch((error) => {
      console.log("Error executing SQL query", ":", error);
      res.sendStatus(500);
    });
});

//POST new dish to the data base
router.post("/", rejectUnauthenticated, (req, res) => {
  const dish = req.body.dish;
  const price = req.body.price;
  const image = req.body.image;
  const ingredients = req.body.ingredients;
  const companyId = null;
  //Holding the returned menu id from first query
  let menuId = null;
  //Holding the returned id's from the inventory
  let inventoryIds = [];
  //Variable to increase everytime ingredients is mapped through
  let ingredientsIndex = -1;

  //Get id of the company belonging to the user
  const queryText = `SELECT * FROM company WHERE user_id = $1;`;
  pool.query(queryText, [req.user.id]).then((result) => {
    companyId = result.rows[0].id;
    //Insert data into the menu table and return the id of the menu item
    const queryText = `INSERT INTO menu (dish, price, image)
  VALUES ($1, $2, $3) RETURNING id;
  `;
    pool
      .query(queryText, [dish, price, image])
      .then((result) => {
        //Setting the returned id of new menu item to be used later
        menuId = result.rows[0].id;
        //Use Promise.all to ensure all queries completed before moving on
        return Promise.all(
          //Loop through the array of objects and get the inventory id of that item
          ingredients.map((ingredient) => {
            let queryText2 = `
        SELECT id FROM inventory WHERE company_id = $1 AND item = $2;
        `;
            return pool
              .query(queryText2, [companyId, ingredient.ingredientName])
              .then((result) => {
                inventoryIds = [...inventoryIds, result.rows[0].id];
              });
          })
        );
      })
      .then((result) => {
        return Promise.all(
          //Loop through the array of ingredient object and post all ingredients
          //to menu_inventory with the inventory id's
          ingredients.map((ingredient) => {
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

            pool.query(queryText3, [
              menuId,
              inventoryIds[ingredientsIndex],
              quantity,
              unit,
            ]);
          })
        );
      })
      .then((result) => {
        //Resetting ingredientsIndex
        ingredientsIndex = -1;
      })
      .catch((error) => {
        console.log("Error executing SQL query", ":", error);
        res.sendStatus(500);
      });
  });
});
module.exports = router;
