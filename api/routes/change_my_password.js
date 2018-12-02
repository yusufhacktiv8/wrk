const express = require('express');
const UserController = require('../controllers/users.js');
const { isAuthorizedAs } = require('../helpers/AuthUtils');

const router = express.Router();

router.put('/', isAuthorizedAs('ADMIN'), UserController.changeMyPassword);

module.exports = router;
