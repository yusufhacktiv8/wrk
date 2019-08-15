const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findOneByMonthYear = function findOneByMonthYear(req, res) {
    const { year, month, projectCode } = req.query;
  
    if (!year || !month || !projectCode) {
      res.json([]);
      return;
    }
  
    models.Score.findOne({
      where: {
        year,
        month,
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
      if (result === null) {
        models.Project.findOne({
          where: {
            code: projectCode,
          },
        })
        .then(project => {
          res.json({
            'Project': project,
          });
        });
      } else {
        res.json(result);
      }
    })
    .catch((err) => {
      sendError(err, res);
    });
  };
