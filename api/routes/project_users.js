const express = require('express');
const ProjectUserController = require('../controllers/project_users.js');

const router = express.Router();

router.get('/', ProjectUserController.findAll);
router.get('/:projectUserId', ProjectUserController.findOne);
router.post('/', ProjectUserController.create);
router.put('/:projectUserId', ProjectUserController.update);
router.delete('/:projectUserId', ProjectUserController.destroy);

module.exports = router;
