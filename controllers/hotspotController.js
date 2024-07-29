const {Hotspot} = require('../models')

const getAllHotspot = async (req, res) => {
    try {
        const objectArray = await Hotspot.find()
        res.json(objectArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getHotspotById = async (req, res) => {
    try {
        const { id } = req.params
        const singleObject = await Hotspot.findById(id)
        if (singleObject) {
            return res.json(singleObject)
        }
        return res.status(404).send(`that Hotspot doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Hotspot doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

const createHotspot = async (req, res) => {
    try {
        const newObject = await Hotspot(req.body)
        await newObject.save()
        return res.status(201).json({
            newObject,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const updateHotspot = async (req, res) => {
    try {
        let { id } = req.params;
        let changeHotspot = await Hotspot.findByIdAndUpdate(id, req.body, { new: true })
        if (changeHotspot) {
            return res.status(200).json(changeHotspot)
        }
        throw new Error("Hotspot not found so cannot be updated")
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`Hotspot doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

const deleteHotspot= async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Hotspot.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Hotspot deleted");
        }
        throw new Error("Hotspot not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllHotspot, 
    getHotspotById, 
    createHotspot, 
    updateHotspot,
    deleteHotspot,
}