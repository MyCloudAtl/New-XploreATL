const {Location} = require('../models')

const getAllLocation = async (req, res) => {
    try {
        const objectArray = await Location.find()
        res.json(objectArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getLocationById = async (req, res) => {
    try {
        const { id } = req.params
        const singleObject = await Location.findById(id)
        if (singleObject) {
            return res.json(singleObject)
        }
        return res.status(404).send(`that Location doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Location doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

const createLocation = async (req, res) => {
    try {
        const newObject = await Location(req.body)
        await newObject.save()
        return res.status(201).json({
            newObject,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const updateLocation = async (req, res) => {
    try {
        let { id } = req.params;
        let changeLocation = await Location.findByIdAndUpdate(id, req.body, { new: true })
        if (changeLocation) {
            return res.status(200).json(changeLocation)
        }
        throw new Error("Location not found so cannot be updated")
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`Location doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

const deleteLocation= async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Location.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Location deleted");
        }
        throw new Error("Location not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllLocation, 
    getLocationById, 
    createLocation, 
    updateLocation,
    deleteLocation,
}