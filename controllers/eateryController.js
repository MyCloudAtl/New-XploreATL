const {Eatery} = require('../models')

const getAllEatery = async (req, res) => {
    try {
        const objectArray = await Eatery.find()
        res.json(objectArray)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getEateryById = async (req, res) => {
    try {
        const { id } = req.params
        const singleObject = await Eatery.findById(id)
        if (singleObject) {
            return res.json(singleObject)
        }
        return res.status(404).send(`that Eatery doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That Eatery doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

const createEatery = async (req, res) => {
    try {
        const newObject = await Eatery(req.body)
        await newObject.save()
        return res.status(201).json({
            newObject,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const updateEatery = async (req, res) => {
    try {
        let { id } = req.params;
        let changeEatery = await Eatery.findByIdAndUpdate(id, req.body, { new: true })
        if (changeEatery) {
            return res.status(200).json(changeEatery)
        }
        throw new Error("Eatery not found so cannot be updated")
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`Eatery doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

const deleteEatery = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Eatery.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Eatery deleted");
        }
        throw new Error("Eatery not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllEatery, 
    getEateryById, 
    createEatery, 
    updateEatery,
    deleteEatery,
}