const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');

router.route('/login')
.get(musicController.login)
.post(musicController.login_post)

module.exports = router;