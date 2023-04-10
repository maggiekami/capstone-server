const knex = require("knex")(require("../knexfile"));
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const { v4: uuid } = require("uuid");

router.post("/register", (req, res) => {
  const { email, fName, lName, password } = req.body;

  knex("user")
    .select()
    .where("email", email)
    .then((data) => {
      if (!data[0]) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          let password = hash;
          let newUser = { email, fName, lName, password };
          knex
            .insert(newUser)
            .into("user")
            .then((data) => {
              res.send("registered");
            })
            .catch((err) => {
              res.status(500).send("There was an error");
            });
        });
      } else {
        res.send("email already registered");
      }
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  knex("user")
    .select()
    .where("email", email)
    .then((data) => {
      if (!data[0]) {
        res.status(401).send("Invalid email or password");
      } else {
        const user = data[0];
        bcrypt.compare(password, user.password, (err, result) => {
          if (err || !result) {
            res.status(401).send("Invalid email or password");
          } else {
            const token = jwt.sign(
              { email: user.email },
              process.env.JWT_SECRET
            );
            res.json({ token });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).send("There was an error");
    });
});

module.exports = router;
