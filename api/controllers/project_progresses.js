const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const { searchYear, searchProject } = req.query;
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;

  const yearWhere = {};
  const projectWhere = {};

  if (searchYear) {
    yearWhere.year = searchYear;
  }

  if (searchProject) {
    projectWhere.id = searchProject;
  }
  models.ProjectProgress.findAndCountAll({
    where: yearWhere,
    include: [
      {
        model: models.Project,
        required: true,
        where: projectWhere,
      },
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

exports.findAllByMonthYear = function findAllByMonthYear(req, res) {
  const { year, month } = req.query;

  if (!year || !month) {
    res.json([]);
    return;
  }

  models.ProjectProgress.findAll({
    where: {
      year,
      month,
    },
    include: [
      {
        model: models.Project,
        required: true,
      },
    ],
  })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
