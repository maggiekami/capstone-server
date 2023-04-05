const knex = require("knex")(require("../knexfile"));
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { v4: uuid } = require("uuid");

// const app = express();

// router.post("/register", async (req, res) => {
//   if (
//     !req.body.email ||
//     !req.body.password ||
//     !req.body.fName ||
//     !req.body.lName
//   ) {
//     return res
//       .status(400)
//       .json({ error: true, message: "Please provide all the details" });
//   }
//   const { email, fName, lName, password } = req.body;

//   try {
//     // wsadza user w tabelke
//     const newUserId = await knex("user").insert(req.body);
//     // wybiera caly row z tym id co new user co wsadzilam
//     const newUser = await knex("user").where({ id: newUserId[0] });

//     res.status(201).json(newUser[0]);
//   } catch (error) {
//     res.status(500).json({
//       error: true,
//       message: "Could not create new user record",
//     });
//   }
// });

// router.post("/register", async (req, res) => {
//   try {
//     const newUserDetails = await knex("user").insert({
//       id: uuid(),
//       email: req.body.email,
//       fName: req.body.fName,
//       lName: req.body.lName,
//       password: req.body.password,
//     });

//     const newUser = await knex("user").where({
//       id: newUserDetails[1],
//     });

//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({
//       error: true,
//       message: `Could not create new user record`,
//     });
//   }
// });

// router.post("/register", (req, res) => {
//   console.log(req);
//   const { email, fName, lName, password } = req.body;

//   knex("user")
//     .select()
//     .where("email", email)
//     .then((data) => {
//       if (!data[0]) {
//         bcrypt
//           .hash(password, saltRounds, function (err, hash) {
//             let hashedPassword = hash;
//             let newUser = { email, fName, lName, hashedPassword };
//             knex
//               .insert(newUser)
//               .into("user")
//               .then((data) => {
//                 res.send("registered");
//               });
//           })
//           .catch((err) => {
//             res.status(500).send("There was an error");
//           });
//       } else {
//         res.send("email already registered");
//       }
//     });
// });

// app.post("/register", (req, res) => {
//   console.log(req);
//   const { email, fName, lName, password } = req.body;

//   knex("user")
//     .select()
//     .where("email", email)
//     .then((data) => {
//       if (!data[0]) {
//         bcrypt.hash(password, saltRounds, function (err, hash) {
//           let password = hash;
//           let newUser = { email, fName, lName, password };
//           knex
//             .insert(newUser)
//             .into("user")
//             .then((data) => {
//               res.send("registered");
//             })
//             .catch((err) => {
//               res.status(500).send("There was an error");
//             });
//         });
//       } else {
//         res.send("email already registered");
//       }
//     });
// });

module.exports = router;
