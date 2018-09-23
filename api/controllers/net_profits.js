const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findOne = function findOne(req, res) {
  const { month, year } = req.query;
  models.NetProfit.findOne({
    where: { year, month },
  })
  .then((credit) => {
    res.json(credit);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
