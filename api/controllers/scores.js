const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAllByMonthYear = function findAllByMonthYear(req, res) {
    const { year, month, projectCode, scoreType } = req.query;
  
    if (!year || !month || !projectCode || !scoreType) {
      res.json([]);
      return;
    }
  
    models.Score.findAll({
      where: {
        year,
        month,
        scoreType,
      },
      include: [
        {
          model: models.Project,
          required: true,
          where: {
            code: projectCode,
          },
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
