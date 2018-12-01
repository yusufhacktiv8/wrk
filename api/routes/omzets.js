const express = require('express');
const OmzetController = require('../controllers/omzet.js');
const { isAuthorizedAsIn } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAsIn(['ADMIN', 'PROJECT']), OmzetController.findByYear);

module.exports = router;
