const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = 5000;

const app = express();

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => {
    console.log("MongoDB Connected Successfully ✅");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`server running at http://loclhost:${PORT}/`);
});
