const express = require('express');
const UploadController = require('../controllers/uploads.js');
const { isAuthorizedAs } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAs('ADMIN'), UploadController.findAll);
router.get('/:uploadId', isAuthorizedAs('ADMIN'), UploadController.findOne);
router.post('/', isAuthorizedAs('ADMIN'), UploadController.create);
router.put('/:uploadId', isAuthorizedAs('ADMIN'), UploadController.update);
router.delete('/:uploadId', isAuthorizedAs('ADMIN'), UploadController.destroy);

module.exports = router;
