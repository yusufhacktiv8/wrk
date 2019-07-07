const express = require('express');
const ProjectProgressController = require('../controllers/project_progresses.js');
const { isAuthorizedAs } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/projects', isAuthorizedAs('ADMIN'), ProjectProgressController.findAllByMonthYear);
router.get('/project', isAuthorizedAs('ADMIN'), ProjectProgressController.findOneByMonthYear);

module.exports = router;
