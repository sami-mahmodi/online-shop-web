const path = require("path");
const express = require("express");
const authRoutes = require("./routes/auth.route");
const productRoutes = require("./routes/products.route");
const baseRoutes = require("./routes/base.route");
const csrf = require("csurf");
const expressSession = require("express-session");
const createSessionConfig = require("./config/session");
const db = require("./data/database");
const csrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(csrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use(errorHandlerMiddleware);
db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Fialed to connect to database!");
    console.log(error);
  });
