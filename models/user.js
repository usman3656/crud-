const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  username: String,
  password: String,
});

const user = mongoose.model("User", UserSchema);

module.exports = user;