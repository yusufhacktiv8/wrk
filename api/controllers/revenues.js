const models = require('../models');

const MINIMUM_YEAR = 2015;

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const { searchYear } = req.query;
  models.Revenue.findAndCountAll({
    where: {
      // year: searchYear || MINIMUM_YEAR,
    },
    order: ['year', 'month'],
  })
  .then((revenues) => {
    res.json(revenues);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findOne = function findOne(req, res) {
  models.Revenue.findOne({
    where: { id: req.params.revenueId },
  })
  .then((revenue) => {
    res.json(revenue);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const revenueForm = req.body;
  const data = JSON.stringify(revenueForm.hasilUsaha);
  models.Revenue.create({
    month: revenueForm.month,
    year: revenueForm.year,
    data,
  })
  .then((revenue) => {
    res.json(revenue);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

const insertOmzet = (year, month, data) => (
  new Promise((resolve, reject) => {
    let plan = 0;
    let actual = 0;
    const externRa1 = data.kontrakDihadapi.pesananTahunLalu.extern.ra || 0;
    const externRi1 = data.kontrakDihadapi.pesananTahunLalu.extern.ri || 0;

    plan = externRa1;
    actual = externRi1;

    models.Omzet.destroy(
      {
        where: { year, month },
      })
    .then(() => {
      models.Omzet.create({
        year,
        month,
        plan,
        actual,
      })
      .then((newOmzet) => {
        resolve(newOmzet);
      })
      .catch((err) => {
        reject(err);
      });
    })
    .catch((err) => {
      reject(err);
    });
  })
);

exports.update = function update(req, res) {
  const revenueForm = req.body;
  const year = revenueForm.year;
  const month = revenueForm.month;
  const data = revenueForm.hasilUsaha;
  const dataJSON = JSON.stringify(data);
  models.Revenue.update(
    {
      year,
      month,
      dataJSON,
    },
    {
      where: { id: req.params.revenueId },
    })
  .then((result) => {
    insertOmzet(year, month, data)
    .then(() => {
      res.json(result);
    });
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.Revenue.destroy(
    {
      where: { id: req.params.revenueId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
