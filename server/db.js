const mongoose = require("mongoose");

const mongoURL = process.env.DATABASE_URL;

const MongoDB = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log("Error: ", error));
};

module.exports = MongoDB;
