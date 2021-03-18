//this is the express application that makes handling requests easier

const express = require("express");

const app = express();
const morgan = require("morgan");
const bodyParse = require("body-parser");
const ItemRoutes = require("./api/routes/items.js");

const userRoutes = require("./api/routes/user.js");

const bodyParser = require("body-parser"); //to parse our request body
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://aditi:rcbackend333@rccluster.if91u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.Promise = global.Promise;
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-ALlow-Origin");
  res.header(
    "Access-Control-ALlow-Headers",
    "Origin, X-Requested-With, Content-TYpe,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/items", ItemRoutes);

app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
