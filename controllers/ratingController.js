const {Rating} = require('../models')

const getAllRating = async (req, res) => {
    try {
        const objectArray = await Rating.find()
        res.json(objectArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getRatingById = async (req, res) => {
    try {
        const { id } = req.params
        const singleObject = await Rating.findById(id)
        if (singleObject) {
            return res.json(singleObject)
        }
        return res.status(404).send(`that Rating doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Rating doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

const createRating = async (req, res) => {
    try {
        const newObject = await Rating(req.body)
        await newObject.save()
        return res.status(201).json({
            newObject,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const updateRating = async (req, res) => {
    try {
        let { id } = req.params;
        let changeRating = await Rating.findByIdAndUpdate(id, req.body, { new: true })
        if (changeRating) {
            return res.status(200).json(changeRating)
        }
        throw new Error("Rating not found so cannot be updated")
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`Rating doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

const deleteRating = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Rating.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Rating deleted");
        }
        throw new Error("Rating not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllRating, 
    getRatingById, 
    createRating, 
    updateRating,
    deleteRating,
}