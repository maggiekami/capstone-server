const express = require("express");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const knex = require("knex")(require("./knexfile"));
const app = express();
const jwt = require("jsonwebtoken");

const productRoutes = require("./routes/productRoutes");

const userRoutes = require("./routes/userRoutes");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const checkoutRoutes = require("./routes/checkoutRoutes");

app.use(express.json());
app.use(express.static("public"));
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use("/product", productRoutes);
// app.use("/register", userRoutes);
app.use("/create-checkout-session", checkoutRoutes);

app.post("/register", (req, res) => {
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

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   knex("user")
//     .select()
//     .where("email", email)
//     .then((data) => {
//       console.log(data);
//       if (data) {
//         console.log(data[0].fName);

//         bcrypt.compare(password, data[0].password, function (err, result) {
//           if (result === true) {
//             console.log(data);

//             // must respond with success object
//             console.log("user exists and email and password match");
//             res.status(200).json({
//               status: {
//                 message: "SUCCESS: email and password match.",
//               },
//             });
//           } else {
//             return res.status(403).json({
//               error: {
//                 message:
//                   "FAIL: Error logging in. Invalid email and password combination.",
//               },
//             });
//           }
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(400).send("No email address or password match found.");
//     });
// });

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   knex("user")
//     .select()
//     .where("email", email)
//     .then((data) => {
//       if (!data[0]) {
//         res.status(401).send("Invalid email or password");
//       } else {
//         const user = data[0];
//         bcrypt.compare(password, user.password, (err, result) => {
//           if (err || !result) {
//             res.status(401).send("Invalid email or password");
//           } else {
//             const token = jwt.sign(
//               { email: user.email },
//               process.env.JWT_SECRET
//             );
//             res.json({ token });
//           }
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send("There was an error");
//     });
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
