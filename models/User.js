const mongoose = require('mongoose');
const { Schema } = mongoose;
//MongoDB lets us have a bunch of different records with different properties. But mongoose wants us to define our properties (schema) ahead of time
const userSchema = new Schema({
  googleId: String,
  //anytime we want to give configuration to our schema we use a object. Here we want to make the default 0
  credits: { type: Number, default: 0 },
});
//we are creating a collection called users with the help of the mongoose model class that have a schema of userSchema
mongoose.model('users', userSchema);
