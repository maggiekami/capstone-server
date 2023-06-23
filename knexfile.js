const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "/knexfile") });

module.exports = {
  client: "mysql2",
  connection: {
    // host: "eu-cdbr-west-(03).cleardb.net",
    host: "eu-cdbr-west-03.cleardb.net",
    user: "b0cfe9a6668d05",
    password: "08ea0093",
    database: "heroku_65b667fb80c64e1",
    charset: "utf8",
  },
};

// mysql://b0cfe9a6668d05:08ea0093@eu-cdbr-west-03.cleardb.net/heroku_65b667fb80c64e1?reconnect=true
// mysql://b0cfe9a6668d05:08ea0093@eu-cdbr-west-03.cleardb.net/heroku_65b667fb80c64e1?reconnect=true
