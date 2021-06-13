const express = require('express');
const router = express.Router();

const siteRouter = require('./siteRoutes');
const musicRouter = require('./musicRoutes');
const userRouter = require('./userRoutes');

router.use('/', siteRouter);
router.use('/music', musicRouter)
router.use('/:user', userRouter)

module.exports = router;