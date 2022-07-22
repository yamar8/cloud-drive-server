const express = require('express');
const router = express.Router();

const fileRouter = require('./fileRoute');
const folderRouter = require('./folderRoute');


router.use('/files',fileRouter);
router.use('/folders',folderRouter);


module.exports = router;