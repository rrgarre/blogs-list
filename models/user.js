const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: [3, 'Vaya nombre más corto...']
  },
  name: String,
  passwordHash: String
})

module.exports = mongoose.model('User', userSchema)