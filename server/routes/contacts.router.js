const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET all of the users contacts
router.get("/", rejectUnauthenticated, (req, res) => {
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
router.post("/", rejectUnauthenticated, (req, res) => {
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

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `
    DELETE FROM contacts 
    WHERE id = $1
    `;

  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log("Error deleteing contact : ", error);
      res.sendStatus(500);
    });
});

module.exports = router;
