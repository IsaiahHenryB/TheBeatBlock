const express = require('express');
const router = express.Router();

const siteRouter = require('./siteRoutes');

router.use('/', siteRouter);

module.exports = router;