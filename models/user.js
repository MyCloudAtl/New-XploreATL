const { Schema } = require('mongoose')

const User = new Schema(
  {
    username: { type: String, maxlength: 255, required: true },
    password: { type: String, maxlength: 255, required: true },
    email: { type: String, maxlength: 254, unique: true, required: true }
  },
  { timestamps: true }
);

module.exports = User