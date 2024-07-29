const { Schema } = require('mongoose')

const User = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true }
  },
  { timestamps: true }
)

module.exports = User