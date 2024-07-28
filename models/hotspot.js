const { Schema } = require('mongoose')

const Hotspot = new Schema(
  {
    location_id: { type: Schema.Types.ObjectId, ref: 'Location_id', required: true },
    image: { type: String, maxlength: 500, required: false },
    category: {
      type: String,
      enum: ['daytime', 'nightlife'],
      required: true
    },
    name: { type: String, maxlength: 255, required: true },
    address: { type: String, maxlength: 255, required: true },
    city: { type: String, maxlength: 100, required: true },
    state: { type: String, maxlength: 100, required: true },
    zip_code: { type: String, maxlength: 20, required: true },
    phone_number: { type: String, maxlength: 20, required: false },
    website: { type: String, required: false },
    operation_hours: { type: String, required: false },
    price_range: {
      type: String,
      enum: ['$-$$', '$$-$$$', '$$$-$$$$'],
      required: false
    },
    description: { type: String, default: 'no description' }
  },
  { timestamps: true }
);

module.exports = Hotspot