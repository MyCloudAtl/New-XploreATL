const mongoose = require('mongoose')
const EaterySchema = require('./eatery')
const HotspotSchema = require('./hotspot')
const LocationSchema = require('./location')
const UserSchema = require('./user')
const ProfileSchema = require('./profile')
const RatingSchema = require('./rating')

const Eatery = mongoose.model('Eatery', EaterySchema)
const Hotspot = mongoose.model('Hotspot', HotspotSchema)
const Location = mongoose.model('Nutrition', LocationSchema)
const User = mongoose.model('User', UserSchema)
const Rating = mongoose.model('Rating', RatingSchema)
const Profile = mongoose.model('Profile', ProfileSchema)

module.exports = {
  Eatery,
  Hotspot,
  Location,
  User,
  Profile,
  Rating,
}