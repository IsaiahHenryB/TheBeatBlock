const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/songs')
.get(userController.home)

router.route('/update/:id')
.get(userController.update_song_get)
.put(userController.update_song_put)
.delete(userController.song_file_delete)

router.route('/delete/:id')
.delete(userController.song_delete)
module.exports = router;