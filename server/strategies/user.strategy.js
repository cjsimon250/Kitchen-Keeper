const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let result = await pool.query('SELECT * FROM "user" WHERE id = $1', [id]);

    // Handle Errors
    let user = result && result.rows && result.rows[0];

    //Selecting the user's company id
    const companyResult = await pool.query(
      `SELECT "user_company".company_id, "company".company FROM "user_company" 
      JOIN "company" ON "company".id = "user_company".company_id
      WHERE user_id = $1`,
      [id]
    );

    // Handle Errors
    let company = companyResult && companyResult.rows && companyResult.rows[0];

    if (user && company) {
      user = {
        ...user,
        companyId: companyResult.rows[0].company_id,
        companyName: companyResult.rows[0].company,
      };

      // user found
      delete user.password; // remove password so it doesn't get sent
      // done takes an error (null in this case) and a user
      done(null, user);
    } else {
      // user not found
      // done takes an error (null in this case) and a user (also null in this case)
      // this will result in the server returning a 401 status code
      done(null, null);
    }
  } catch (error) {
    console.log("Error with query during deserializing user ", error);
    // done takes an error (we have one) and a user (null in this case)
    // this will result in the server returning a 500 status code
    done(error, null);
  }
});

// Does actual work of logging in
passport.use(
  "local",
  new LocalStrategy((username, password, done) => {
    pool
      .query('SELECT * FROM "user" WHERE username = $1', [username])
      .then((result) => {
        const user = result && result.rows && result.rows[0];
        if (user && encryptLib.comparePassword(password, user.password)) {
          // All good! Passwords match!
          // done takes an error (null in this case) and a user
          done(null, user);
        } else {
          // Not good! Username and password do not match.
          // done takes an error (null in this case) and a user (also null in this case)
          // this will result in the server returning a 401 status code
          done(null, null);
        }
      })
      .catch((error) => {
        console.log("Error with query for user ", error);
        // done takes an error (we have one) and a user (null in this case)
        // this will result in the server returning a 500 status code
        done(error, null);
      });
  })
);

module.exports = passport;
