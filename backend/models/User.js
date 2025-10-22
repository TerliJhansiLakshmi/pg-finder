const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // plain text for demo
  role: { type: String, enum: ['owner','admin','user'], default: 'user' }
});
module.exports = mongoose.model('User', UserSchema);
