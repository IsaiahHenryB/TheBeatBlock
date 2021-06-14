const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');

router.route('/')
.get(siteController.home)

router.route('/about')
.get(siteController.about)

router.route('/music')
.get(siteController.music)

router.route('/songs/:genre')
.get(siteController.genre_get)

router.route('/upload')
.get(siteController.upload)
.post(siteController.upload_post)

router.route('/blog')
.get(siteController.blog)

router.route('/login')
.get(siteController.login)
.post(siteController.login_post)

router.route('/signup')
.get(siteController.signup)
.post(siteController.signup_post)

router.route('/logout')
.get(siteController.logout)

module.exports = router;