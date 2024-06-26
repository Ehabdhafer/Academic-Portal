const express = require("express");
const sequelize = require("./config/db");
const app = express();
const session = require("express-session");
const passport = require("passport");
app.use(express.json());
var cors = require("cors");
app.use(cors());

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const user_router = require("./routes/user_route");
const course_router = require("./routes/course_route");

// ---------------------------------------------------------

app.use(user_router);
app.use(course_router);

// ----------------------------------------------------------
sequelize
  .sync()
  .then(() => {
    app.listen(5000, () => {
      console.log("server running at http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
