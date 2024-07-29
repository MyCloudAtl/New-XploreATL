const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')
const cors = require('cors')
const eateryController = require('./controllers/eateryController')
const userController = require('./controllers/userController')
const hotspotController = require('./controllers/hotspotController')
const locationController = require('./controllers/locationController')
const profileController = require('./controllers/profileController')
const ratingController = require('./controllers/ratingController')
const logger = require('morgan')
const PORT = process.env.PORT || 3003
const app = express()
const { User } = require('./models')

app.use(cors({credentials: true, origin:'http://localhost:5173'}))


app.get('*', (req,res) => res.send('404 page not found'))

module.exports = app