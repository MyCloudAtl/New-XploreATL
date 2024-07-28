const { Schema } = require('mongoose');

const Rating = new Schema(
  {
    avg_rating: { type: Number, enum: [1, 2, 3, 4, 5],required: true},
    date_posted: { type: Date, default: Date.now, required: false},
    eatery: { type: Schema.Types.ObjectId, ref: 'Eatery', required: false, default: null },
    hotspot: { type: Schema.Types.ObjectId, ref: 'Hotspot', required: false, default: null }
  },
  { timestamps: true }
)

module.exports = Rating