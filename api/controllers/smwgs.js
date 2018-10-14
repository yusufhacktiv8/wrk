const models = require('../models');

const MINIMUM_YEAR = 2015;

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const { searchYear, project } = req.query;
  const smwgType = req.query.smwgType ? parseInt(req.query.smwgType, 10) : 1;
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;

  const projectWhere = {};

  if (project) {
    projectWhere.id = project;
  }

  models.Smwg.findAndCountAll({
    where: {
      smwgType,
      year: searchYear || MINIMUM_YEAR,
    },
    include: [
      {
        model: models.Project,
        required: true,
        where: projectWhere,
      },
    ],
    order: ['year', 'month'],
    limit,
    offset,
  })
  .then((smwgs) => {
    res.json(smwgs);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findByYear = function findByYear(req, res) {
  const { year } = req.query;
  models.Smwg.findAll({
    where: {
      year: year || MINIMUM_YEAR,
    },
    order: ['year', 'month'],
  })
  .then((smwgs) => {
    res.json(smwgs);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findOne = function findOne(req, res) {
  models.Smwg.findOne({
    where: { id: req.params.smwgId },
    include: [
      { model: models.Project },
    ],
  })
  .then((smwg) => {
    res.json(smwg);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

const insertSmwgItem = (smwgId, code, name, smwgSequence) => (
  new Promise((resolve, reject) => {
    models.SmwgItem.create({
      SmwgId: smwgId,
      code,
      name,
      smwgSequence,
    })
    .then((smwgItem) => {
      resolve(smwgItem.id);
    })
    .catch((err) => {
      console.error(err);
      reject(err);
    });
  })
);

exports.create = function create(req, res) {
  const smwgForm = req.body;
  const projectId = smwgForm.project;
  const { smwgType } = smwgForm;
  smwgForm.ProjectId = projectId;
  models.Smwg.create(smwgForm)
  .then((smwg) => {
    models.SmwgTemplate.findAll({
      where: {
        smwgType,
      },
    })
    .then((templates) => {
      const promises = [];
      for (let i = 0; i < templates.length; i += 1) {
        const template = templates[i];
        const { code, name, smwgSequence } = template;
        promises.push(insertSmwgItem(smwg.id, code, name, smwgSequence));
      }
      Promise.all(promises)
      .then(() => {
        res.json(smwg);
      });
    });
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const smwgForm = req.body;
  const projectId = smwgForm.project;
  smwgForm.ProjectId = projectId;
  models.Smwg.update(
    smwgForm,
    {
      where: { id: req.params.smwgId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.Smwg.destroy(
    {
      where: { id: req.params.smwgId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
