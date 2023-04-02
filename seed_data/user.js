const CryptoJS = require("crypto-js");

module.exports = [
  {
    id: 1,
    email: "john@example.com",
    fName: "John",
    lName: "Smith",
    password: CryptoJS.SHA256("password123").toString(CryptoJS.enc.Hex),
  },
];
