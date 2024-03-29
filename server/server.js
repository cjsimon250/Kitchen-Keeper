const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const inventoryRouter = require("./routes/inventory.router");
const menuRouter = require("./routes/menu.router");
const companyRouter = require("./routes/company.router");
const orderRouter = require("./routes/orders.router");
const salesRouter = require("./routes/sales.router");
const notificationsRouter = require("./routes/notifications.router");
const contactRouter = require("./routes/contacts.router");
const teamRouter = require("./routes/team.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/menu", menuRouter);
app.use("/api/orders", orderRouter);
app.use("/api/sales", salesRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/contacts", contactRouter);
app.use("/api/team", teamRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
