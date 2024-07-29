const {Profile} = require('../models')

const getAllProfile = async (req, res) => {
    try {
        const objectArray = await Profile.find()
        res.json(objectArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getProfileById = async (req, res) => {
    try {
        const { id } = req.params
        const singleObject = await Profile.findById(id)
        if (singleObject) {
            return res.json(singleObject)
        }
        return res.status(404).send(`that Profile doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Profile doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

const createProfile = async (req, res) => {
    try {
        const newObject = await Profile(req.body)
        await newObject.save()
        return res.status(201).json({
            newObject,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const updateProfile = async (req, res) => {
    try {
        let { id } = req.params;
        let changeProfile = await Profile.findByIdAndUpdate(id, req.body, { new: true })
        if (changeProfile) {
            return res.status(200).json(changeProfile)
        }
        throw new Error("Profile not found so cannot be updated")
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`Profile doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

const deleteProfile= async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Profile.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Profile deleted");
        }
        throw new Error("Profile not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllProfile, 
    getProfileById, 
    createProfile, 
    updateProfile,
    deleteProfile,
}