const { Schema } = require('mongoose')

const User = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true }
  },
  { timestamps: true }
)

module.exports = User