const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');

router.route('/')
.get(siteController.home)

router.route('/about')
.get(siteController.about)

router.route('/music')
.get(siteController.music)

router.route('/upload')
.get(siteController.upload)

router.route('/blog')
.get(siteController.blog)

router.route('/login')
.get(siteController.login)

router.route('/signup')
.get(siteController.signup)

module.exports = router;