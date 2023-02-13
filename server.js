const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes/admin")

const app = express();
app.use(express.json());

app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

const url = "mongodb+srv://usman120ghani:Usman123+@webdev.gohnvuy.mongodb.net/WebDev";
mongoose.connect(url).then(()=> console.log("connected"));

