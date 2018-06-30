const express = require('express');
const OmzetController = require('../controllers/omzet.js');
const { isAuthorizedAs } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', OmzetController.findByYear);

module.exports = router;
