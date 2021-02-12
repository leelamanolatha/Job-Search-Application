const express = require('express')
const app = express()
require("dotenv").config();
var indexRouter = require("./routes/indexRouter");
var apiRouter = require("./routes/apiRouter");
var cors = require("cors");
// react running on 3000 for dev.
const session = require("express-session");
const port = 3001

//mongodb connection
// console.log(process.env)
const MONGODB_URL = process.env.MONGODB_URL;
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //don't show the log when it is test
    if (process.env.NODE_ENV !== "test") {
      console.log("Connected to %s", MONGODB_URL);
      console.log("App is running ... \n");
      console.log("Press CTRL + C to stop the process. \n");
    }
  })
  .catch((err) => {
    console.error("App starting error:", err.message);
    process.exit(1);
  });
var db = mongoose.connection;

app.use(express.urlencoded({ limit:'50mb',extended: true }));
app.use(express.json({limit:'50mb'}));
app.use(express.text());
app.use(
  session({
    secret: "jobsearch_leelamanolatha",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db }),
  })
);

app.use(cors());
app.use("/", indexRouter);
app.use("/api/", apiRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})