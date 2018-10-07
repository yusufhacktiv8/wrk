const express = require('express');
const ProjectProgressController = require('../controllers/project_progresses.js');
const { isAuthorizedAs } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAs('ADMIN'), ProjectProgressController.findAll);
router.post('/', isAuthorizedAs('ADMIN'), ProjectProgressController.create);
router.put('/:projectProgressId', isAuthorizedAs('ADMIN'), ProjectProgressController.update);
router.delete('/:projectProgressId', isAuthorizedAs('ADMIN'), ProjectProgressController.destroy);

module.exports = router;
