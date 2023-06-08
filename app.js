const path = require("path");
const express = require("express");
const authRoutes = require("./routes/auth.route");
const csrf = require("csurf");
const app = express();
const db = require("./data/database");
const csrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(csrf());
app.use(csrfTokenMiddleware);
app.use(authRoutes);
app.use(errorHandlerMiddleware);
db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Fialed to connect to database!");
    console.log(error);
  });
