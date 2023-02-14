const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes/user")
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());

app.use(cookieParser())

app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

console.log("ertyui")

const url = "mongodb+srv://usman120ghani:Usman123+@webdev.gohnvuy.mongodb.net/WebDev";
mongoose.connect(url).then(()=> console.log("connted"));
