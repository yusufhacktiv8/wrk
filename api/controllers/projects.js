const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;
  models.Project.findAndCountAll({
    where: {
      $or: [
        { code: { $ilike: searchText } },
        { name: { $ilike: searchText } },
      ],
    },
    limit,
    offset,
  })
  .then((projects) => {
    res.json(projects);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const projectForm = req.body;
  models.Project.create(projectForm)
  .then((project) => {
    res.json(project);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const projectForm = req.body;
  models.Project.update(
    projectForm,
    {
      where: { id: req.params.projectId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.Project.destroy(
    {
      where: { id: req.params.projectId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.countByType = function countByType(req, res) {
  const { projectType } = req.query;

  if (!projectType) {
    res.json({
      count: 0,
    });
    return;
  }

  models.Project.count({
    where: {
      projectType,
    },
  })
  .then((count) => {
    res.json({
      count,
    });
  })
  .catch((err) => {
    sendError(err, res);
  });
};
