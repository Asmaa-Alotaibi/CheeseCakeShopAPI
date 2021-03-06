const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const itemRoutes = require("./routes/items");
const db = require("./db/models");
const path = require("path");
const bakeryRoutes = require("./routes/bakeries");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");

const app = express();

//middleware

app.use(bodyParser.json());
app.use(cors());
app.use(orderRoutes);

// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(userRoutes);

app.use("/items", itemRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/bakeries", bakeryRoutes);

// error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
