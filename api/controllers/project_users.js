const models = require("../models");
const { Op } = require("sequelize");

const sendError = (err, res) => {
  res
    .status(500)
    .send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : "%%";
  const projectId = req.query.searchProject;
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage
    ? parseInt(req.query.currentPage, 10)
    : 1;
  const offset = (currentPage - 1) * limit;

  const where = {};

  if (projectId) {
    where.ProjectId = projectId;
  }

  models.ProjectUser.findAndCountAll({
    where,
    include: [
      {
        model: models.User,
        where: {
          [Op.or]: [
            { username: { [Op.iLike]: searchText } },
            { name: { [Op.iLike]: searchText } },
          ],
        },
      },
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

exports.findOne = function findOne(req, res) {
  models.ProjectUser.findOne({
    where: { id: req.params.projectUserId },
  })
    .then((projectUser) => {
      res.json(projectUser);
    })
    .catch((err) => {
      sendError(err, res);
    });
};

exports.create = function create(req, res) {
  const projectUserForm = req.body;
  const userId = projectUserForm.user;
  const projectId = projectUserForm.project;

  projectUserForm.UserId = userId;
  projectUserForm.ProjectId = projectId;

  models.ProjectUser.create(projectUserForm)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      sendError(err, res);
    });
};

exports.update = function update(req, res) {
  const projectUserForm = req.body;
  const userId = projectUserForm.user;
  const projectId = projectUserForm.project;

  models.ProjectUser.findOne({
    where: { id: req.params.projectUserId },
  })
    .then((projectUser) => {
      projectUser.UserId = userId;
      projectUser.ProjectId = projectId;
      projectUser.save().then((saveResult) => {
        res.json(saveResult);
      });
    })
    .catch((err) => {
      sendError(err, res);
    });
};

exports.destroy = function destroy(req, res) {
  models.ProjectUser.destroy({
    where: { id: req.params.projectUserId },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      sendError(err, res);
    });
};
