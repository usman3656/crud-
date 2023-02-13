const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AdminSchema  = new Schema({
    id : ObjectId,
    username:String,
    password: String,
    dept : String,
})

const admin = mongoose.model("Admin",AdminSchema)

module.exports = admin;