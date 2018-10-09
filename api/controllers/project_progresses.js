const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;
  models.ProjectProgress.findAndCountAll({
    where: {
      // $or: [
      //   { username: { $ilike: searchText } },
      //   { name: { $ilike: searchText } },
      // ],
    },
    include: [
      { model: models.Project },
    ],
    limit,
    offset,
  })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};


exports.create = function create(req, res) {
  const projectProgressForm = req.body;
  const projectId = projectProgressForm.project;
  projectProgressForm.ProjectId = projectId;

  models.ProjectProgress.create(projectProgressForm)
  .then((result) => {
    res.json(result);
  })
  .catch((errCreate) => {
    sendError(errCreate, res);
  });
};

exports.update = function update(req, res) {
  const projectProgressForm = req.body;
  projectProgressForm.ProjectId = projectProgressForm.project;
  models.ProjectProgress.update(
    projectProgressForm,
    {
      where: { id: req.params.projectProgressId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.ProjectProgress.destroy(
    {
      where: { id: req.params.projectProgressId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
