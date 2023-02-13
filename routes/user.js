require('dotenv').config();
const express = require("express");
const userModel = require("../models/user");
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());



// app.post("/add_user", async (request, response) => {
//     const user = new userModel(request.body);
//     const usern = {name:user};

//     const accessToken = jwt.sign(usern,process.env.ACCESS_TOKEN_SECRET)

//     res.json( {accessToken: accessToken});

//     try {
//       await user.save();
//       response.send(user);
//     } catch (error) {
//       response.status(400).send(error);
//     }
// });

app.post("/register", async (req, res) => {
  try{
    const {username} = req.body;
    console.log(username);

    const newUser = await userModel.findOne({username});
    if(!newUser){
      const result = await userModel.create({
        username,
      })

      const token = jwt.sign({result}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1hr"
      })
      res.cookie("token", token).send("hello")
    }
    else{
      res.send("user exists");
    }

    // console.log(req.body);

    // const newuser = userModel.findOne({username})
    // if (!newuser) {
      
    //   const result = await userModel.save({username: Shehryar});
    //   console.log(result);

    //   // console.log(accessToken)
    //   // const accessToken = jwt.sign(req.body,process.env.ACCESS_TOKEN_SECRET)
    //   // console.log("ecdfsc")
    //   res.status(200);
    // }
    // else {
    //   console.log("user exist")
    //   res.sendStatus(400).send(err)
    // }
  }
    catch (error){
    console.log(error)
      
    }
  }
 

);

app.get("/posts", authenticateToken, (req,res) => {

  console.log("oiuyt")

  const users =  userModel.find({});
  console.log(users)
  res.json(users.filter(users => users.username === req.username))
});

function authenticateToken(req,res,next) {
  console.log(req)

  const authHeader  = req.body['Authorization'];
  console.log(authHeader)
  const token = authHeader && authHeader.split('')[1]
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err)return res.sendStatus(403)
  req.user = user 
  next()

 })
}


app.get("/users", async(request,response) => {
    const users = await userModel.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(400).send(error);
    }
  });

  app.put("/update_user", async (request, response) => {
    try {
      const user = await userModel.findOneAndUpdate({username: request.body.username}, request.body, {new: true});
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.delete("/delete_user", async (request, response) => {
    try {
      const user = await userModel.deleteOne({username: request.body.username});
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});


module.exports = app;