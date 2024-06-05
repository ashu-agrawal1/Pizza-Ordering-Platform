const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.DB, { dbName: "pizza", family: 4 });
  const db = mongoose.connection;
  db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
};
