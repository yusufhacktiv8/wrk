const express = require('express');
const UploadController = require('../controllers/uploads.js');

const router = express.Router();

router.post('/', UploadController.processUpload);

module.exports = router;
