const { Schema } = require('mongoose')

const Profile = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User_id', required: false },
    favorite_eateries: [{ type: Schema.Types.ObjectId, ref: 'Eatery' }],
    favorite_hotspots: [{ type: Schema.Types.ObjectId, ref: 'Hotspot' }],
    bookmarked_hotspots: [{ type: Schema.Types.ObjectId, ref: 'Hotspot' }],
    bookmarked_eateries: [{ type: Schema.Types.ObjectId, ref: 'Eatery' }]
  },
  { timestamps: true }
)

module.exports = Profile