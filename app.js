const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/users_login_data");

var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

// connection with mongodb and schema

const userschema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const user = mongoose.model("user", userschema);
module.exports = user;

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/insert", function (req, res) {
  var obj = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  var myData = new user(obj);
  myData .save()
    .then((item) => {
      res.send("Name saved to database");
    })
    .catch((err) => {
      res.status(400).send("Unable to save to database");
    });
});

// signup routing
app.get("/signup", function (req, res) {
  res.render("signup");
});

app.listen(8080);
