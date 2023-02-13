const express = require("express");
const userModel = require("../models/user");
const app = express();

app.post("/add_user", async (request, response) => {
    const user = new userModel(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(400).send(error);
    }
});

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