const mongoose = require('mongoose');
const { Schema } = mongoose;
//MongoDB lets us have a bunch of different records with different properties. But mongoose wants us to define our properties (schema) ahead of time
const userSchema = new Schema({
  googleId: String,
});
//we are creating a collection called users with the help of the mongoose model class that have a schema of userSchema
mongoose.model('users', userSchema);
