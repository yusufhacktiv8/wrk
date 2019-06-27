const express = require('express');
const HomeController = require('../controllers/home.js');
const { isAuthorizedAsIn } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAsIn(['ADMIN', 'PROJECT']), HomeController.findByMonthYear);

module.exports = router;
