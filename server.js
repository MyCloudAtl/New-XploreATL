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
app.use(bodyParser.json())
app.use(logger('dev'))
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })

app.get('/users', userController.getAllUser)
app.get('/users/:id', userController.getUserById)
app.post('/users', userController.createUser)
app.put('/users/:id', userController.updateUser)
app.delete('/users/:id', userController.deleteUser)

app.get('/eateries', eateryController.getAllEatery)
app.get('/eateries/:id', eateryController.getEateryById)
app.post('/eateries', eateryController.createEatery)
app.put('/eateries/:id', eateryController.updateEatery)
app.delete('/eateries/:id', eateryController.deleteEatery)

app.get('/hotspots', hotspotController.getAllHotspot)
app.get('/hotspots/:id', hotspotController.getHotspotById)
app.post('/hotspots', hotspotController.createHotspot)
app.put('/hotspots/:id', hotspotController.updateHotspot)
app.delete('/hotspots/:id', hotspotController.deleteHotspot)

app.get('/locations', locationController.getAllLocation)
app.get('/locations/:id', locationController.getLocationById)
app.post('/locations', locationController.createLocation)
app.put('/locations/:id', locationController.updateLocation)
app.delete('/locations/:id', locationController.deleteLocation)

app.get('/profiles', profileController.getAllProfile)
app.get('/profiles/:id', profileController.getProfileById)
app.post('/profiles', profileController.createProfile)
app.put('/profiles/:id', profileController.updateProfile)
app.delete('/profiles/:id', profileController.deleteProfile)

app.get('/ratings', ratingController.getAllRating)
app.get('/ratings/:id', ratingController.getRatingById)
app.post('/ratings', ratingController.createRating)
app.put('/ratings/:id', ratingController.updateRating)
app.delete('/ratings/:id', ratingController.deleteRating)


//User Resources
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    try {
        const user = new User({ username, email })
        await User.register(user, password);
        res.status(201).send({ message: 'Registration successful' })
    } catch (error) {
        res.status(500).send({ message: 'Registration failed', error })
    }
})
app.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send({ message: 'Logout failed', error: err })
        }
        res.status(200).send({ message: 'Logout successful' })
    })
})
app.post('/login', passport.authenticate('local'), (req, res) => {
    console.log("Login successful")
    res.status(200).send({ message: 'Login successful' })
})
app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id
    try {
        const result = await User.findByIdAndDelete(userId)
        if (!result) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ message: 'Account deleted successfully' })
    } catch (error) {
        console.error('Error deleting user:', error)
        res.status(500).json({ message: 'Failed to delete account', error })
    }
})


app.get('/', (req, res) => {
  res.send('This is our root page!')
})

app.get('*', (req,res) => res.send('404 page not found'))

module.exports = app