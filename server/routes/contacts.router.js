const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET all of the users contacts
router.get("/", (req, res) => {
  const queryText = `
SELECT * FROM contacts WHERE company_id = $1;
`;

  pool
    .query(queryText, [req.user.companyId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("Error fetching user's contacts :", error);
    });
});

//POST new contact
router.post("/", (req, res) => {
  console.log("REQ BODY:", req.body);
  const queryText = `
  INSERT INTO contacts (name, email, phone, address, contact_company, company_id)
  VALUES ($1, $2, $3, $4, $5, $6);
  `;

  pool
    .query(queryText, [
      req.body.name,
      req.body.email,
      req.body.phoneNumber,
      req.body.address,
      req.body.company,
      req.user.companyId,
    ])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error posting new contact : ", error);
      res.sendStatus(500);
    });
});

module.exports = router;
