const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const eateryController = require('./controllers/eateryController')
const userController = require('./controllers/userController')
const hotspotController = require('./controllers/hotspotController')
const locationController = require('./controllers/locationController')
const profileController = require('./controllers/profileController')
const logger = require('morgan')
const PORT = process.env.PORT || 3003
const app = express()
const { User, Profile } = require('./models')


app.use(cors({credentials: true, origin:'http://localhost:5173'}))

app.use(bodyParser.urlencoded({ extended: true }))
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(logger('dev'))
app.use(bodyParser.json())

app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

db.on('error', console.error.bind(console, 'MongoDB connection error'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })

app.get('/', (req, res) => {
    res.send('This is our root page!')
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

app.get('/currentUser', async (req, res) => {
    const userProfile = await Profile.findOne({user_id : req.user._id})
    console.log("req:" + req.user)
    const user = req.user
    res.json({user, userProfile})
})

//User Resources
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    try {
        const user = new User({ username, email })
        await User.register(user, password)
        // await user.save()
        const profile = new Profile({user_id: user._id})
        profile.save()
        res.status(201).send({ message: 'Registration successful', user })
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
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
      const user = await User.findOne({ username });
      
      if (!user) {
        return res.status(401).send('Unauthorized');
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(401).send('Unauthorized');
      }
      
      // Assuming a JWT token is generated and sent upon successful login
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret')
      res.json({ token })
      
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).send('Server Error');
    }
  });
  
  
app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id
    const { username, password } = req.body;
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete account', error });
    }
})

app.get('*', (req,res) => res.send('404 page not found'))

module.exports = app