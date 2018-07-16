const express = require('express');
const ProjectController = require('../controllers/projects.js');
const { isAuthorizedAs } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAs('ADMIN'), ProjectController.findAll);
router.get('/:projectId', isAuthorizedAs('ADMIN'), ProjectController.findOne);
router.post('/', isAuthorizedAs('ADMIN'), ProjectController.create);
router.put('/:projectId', isAuthorizedAs('ADMIN'), ProjectController.update);
router.delete('/:projectId', isAuthorizedAs('ADMIN'), ProjectController.destroy);

module.exports = router;
