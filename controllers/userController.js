const {User} = require('../models')

const getAllUser = async (req, res) => {
    try {
        const objectArray = await User.find()
        res.json(objectArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

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
        return res.status(500).send(error.message);
    }
}

const createUser = async (req, res) => {
    try {
        const newObject = await new User(req.body)
        await newObject.save()
        return res.status(201).json({
            newObject,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const updateUser = async (req, res) => {
    try {
        let { id } = req.params;
        let changeUser = await User.findByIdAndUpdate(id, req.body, { new: true })
        if (changeUser) {
            return res.status(200).json(changeUser)
        }
        throw new Error("User not found so cannot be updated")
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`User doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

const deleteUser= async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await User.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("User deleted");
        }
        throw new Error("User not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllUser, 
    getUserById, 
    createUser, 
    updateUser,
    deleteUser,
}