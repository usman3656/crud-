const express = require("express");
const adminModel = require("../models/admin");
const app = express();

app.post("/add_user",async (request,response) =>{

    console.log("arrrived")
    const admin = new adminModel(request.body);
    try{
        await admin.save();
        response.send(admin.username);
    } catch(error)
    {
        response.status(500).send(error);
    }
})

app.get("/users", async(request,response) =>{
    const admin =await adminModel.find({});
    console.log("get")
    try{
        response.send(admin);
    }catch(error)
    {
        response.status(500).send(error);
    }
})
app.put("/update_users", async(request,response) =>{
    try{
        const admin =await adminModel.findOneAndUpdate({username: request.body.username},request.body,{new: true});
        console.log("put")
        response.send(admin.password);

    }catch(error)
    {
        response.status(500).send(error);
    }
})
app.delete("/delete_user", async(request,response) =>{
    try{
        const admin =await adminModel.deleteOne({username: request.body.username});
        console.log("del")
        response.send(admin.username);

    }catch(error)
    {
        response.status(500).send(error);
    }
})
module.exports = app;