const express = require('express');
const UploadController = require('../controllers/uploads.js');
const { isAuthorizedAs, isAuthorizedAsIn } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAsIn(['ADMIN', 'PROJECT']), UploadController.findAll);
router.get('/:uploadId', isAuthorizedAs('ADMIN'), UploadController.findOne);
router.post('/', isAuthorizedAs('ADMIN'), UploadController.create);
router.put('/:uploadId', isAuthorizedAs('ADMIN'), UploadController.update);
router.delete('/:uploadId', isAuthorizedAs('ADMIN'), UploadController.destroy);

module.exports = router;
