const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.getAllUser)
router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.post('/:userId/likeEatery/:eateryId', userController.likeEatery)
router.post('/:userId/unlikeEatery/:eateryId', userController.unlikeEatery)
router.post('/:userId/likeHotspot/:hotspotId', userController.likeHotspot)
router.post('/:userId/unlikeHotspot/:hotspotId', userController.unlikeHotspot)

module.exports = router