const express = require('express');
const app = express();
require('dotenv').config()

app.get("/", (req, res) => {
  res.send("<h1>Welcome to my page</h1>");
});

app.listen(4000, () => {
  console.log("App is running on port 4000");
});