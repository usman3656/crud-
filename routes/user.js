require('dotenv').config();
const express = require("express");
const userModel = require("../models/user");
const app = express();
const jwt = require('jsonwebtoken');
const { find } = require('../models/user');

app.use(express.json());

app.post("/register&login", async (req, res) => {
  try{
    const {username,password} = req.body;
    console.log(username,password);

    const newUser = await userModel.findOne({username});
    if(!newUser){
      const result = await userModel.create({
        username,
        password
      })

      const token = jwt.sign({result}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1hr"
      })
      res.cookie('token', token, { 
        httpOnly: true, 
        maxAge: 3600000 // 1 hour 
      }).send(token);
    }
    else{
      res.send("user exists");
    }
  }
    catch (error){
    console.log(error)
      
    }
  }
);

app.get("/getallusers", authenticateToken, async (req,res) => {

  console.log("oiuyt")

  console.log();
  const users =  await userModel.find({});

  res.send(users)
});

function authenticateToken(req, res, next) {

  const token = req.cookies.token;
  console.log(token);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    if(req.body.username == user.result.username ){
      //res.send({message : "Verified"})
    }else{
      res.sendStatus(400).send({message : "Not verified"})
    }
   
    next();
  });
}

  app.put("/update_user", authenticateToken, async (req, res) => {
    try {
      console.log(req.body.password)

      await userModel.findOneAndUpdate({username: req.body.username}, {password:req.body.password});
      const user = await userModel.find({username:req.body.username})
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.delete("/delete_user", authenticateToken, async (request, response) => {
    try {
      const user = await userModel.deleteOne({username: request.body.username});
      response.send(user);
      cookies.set('testtoken', {maxAge: 0});
    } catch (error) {
      response.status(500).send(error);
    }
});


module.exports = app;