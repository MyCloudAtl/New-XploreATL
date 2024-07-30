const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = require('mongoose')

const User = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    likedEateries: [{ type: Schema.Types.ObjectId, ref: 'Eatery' }],
    likedHotspots: [{ type: Schema.Types.ObjectId, ref: 'Hotspot' }]
  },
  { timestamps: true }
)

User.plugin(passportLocalMongoose)

module.exports = User
