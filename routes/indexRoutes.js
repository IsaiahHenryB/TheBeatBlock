const express = require('express');
const router = express.Router();

const siteRouter = require('./siteRoutes');
const musicRouter = require('./musicRoutes');

router.use('/', siteRouter);
router.use('/music', musicRouter)

module.exports = router;