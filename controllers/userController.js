const {User, Eatery, Hotspot } = require('../models')

//Read
const getAllUser = async (req, res) => {
    try {
        const objectArray = await User.find()
        res.json(objectArray)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//Read
const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const singleObject = await User.findById(id)
        if (singleObject) {
            return res.json(singleObject)
        }
        return res.status(404).send(`that User doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That User doesn't exist`)
        }
        return res.status(500).send(error.message)
    }
}

//create
const createUser = async (req, res) => {
    try {
        const newObject = await new User(req.body)
        await newObject.save()
        return res.status(201).json({
            newObject,
        })
    } catch (error) {
        // if (error.name === 'CastError' && error.kind === 'ObjectId') {
        //     return res.status(404).send(`That User doesn't exist`)
        // }
        return res.status(500).json({ error: error.message })
    }
}

//update
const updateUser = async (req, res) => {
    try {
        let { id } = req.params
        let changedObject = await User.findByIdAndUpdate(id, req.body, { new: true })
        if (changedObject) {
            return res.status(200).json(changedObject)
        }
        throw new Error("User not found and can't be updated")
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That User doesn't exist`)
        }
        return res.status(500).send(error.message)
    }
}

//delete
const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        // Logic to delete user by ID from MongoDB
        await User.findByIdAndDelete(id)
        res.status(200).send({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).send({ message: 'Error deleting user', error })
    }
}

// Like an Eatery
const likeEatery = async (req, res) => {
  try {
    console.log('like eatery was called', req)
    const { userId, eateryId } = req.params
    const user = await User.findById(userId)
    if (!user.likedEateries.includes(eateryId)) {
      user.likedEateries.push(eateryId)
      await user.save()
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

// Unlike an Eatery
const unlikeEatery = async (req, res) => {
  try {
    const { userId, eateryId } = req.params
    const user = await User.findById(userId)
    user.likedEateries.pull(eateryId)
    await user.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

// Like a Hotspot
const likeHotspot = async (req, res) => {
  try {
    console.log('like hotspot was called', req)
    const { userId, hotspotId } = req.params
    const user = await User.findById(userId)
    if (!user.likedHotspots.includes(hotspotId)) {
      user.likedHotspots.push(hotspotId)
      await user.save()
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

// Unlike a Hotspot
const unlikeHotspot = async (req, res) => {
  try {
    const { userId, hotspotId } = req.params
    const user = await User.findById(userId)
    user.likedHotspots.pull(hotspotId)
    await user.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.likeEatery = (req, res) => {
  const { userId, eateryId } = req.params
  // Logic to like the eatery
  res.status(200).send({ message: 'Eatery liked!' })
}

exports.unlikeEatery = (req, res) => {
  const { userId, eateryId } = req.params
  // Logic to unlike the eatery
  res.status(200).send({ message: 'Eatery unliked!' })
}

module.exports = {
    getAllUser, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser,
    likeEatery,
    unlikeEatery,
    likeHotspot,
    unlikeHotspot
}