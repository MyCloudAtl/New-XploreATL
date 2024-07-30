const mongoose = require('mongoose')
const UserSchema = require('./user')
const EaterySchema = require('./eatery')
const HotspotSchema = require('./hotspot')
const LocationSchema = require('./location')
// const ProfileSchema = require('./profile')

const User = mongoose.model('User', UserSchema)
const Eatery = mongoose.model('Eatery', EaterySchema)
const Hotspot = mongoose.model('Hotspot', HotspotSchema)
const Location = mongoose.model('Location', LocationSchema)
// const Profile = mongoose.model('Profile', ProfileSchema)

module.exports = {
  User,
  Eatery,
  Hotspot,
  Location,
  // Profile,
}