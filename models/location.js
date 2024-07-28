const { Schema } = require('mongoose')

const Location = new Schema(
  {
    county: { type: String, maxlength: 255, required: true },
    state: { type: String, maxlength: 100, required: true }
  },
  { timestamps: true }
)

module.exports = Location