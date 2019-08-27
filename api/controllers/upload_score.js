const Excel = require('exceljs');
const moment = require('moment');
const models = require('../models');
const SHE_LABEL = 'SHE';

const insertScore = (year, month, projectId, scoreType, description, raScore, riScore) => (
  new Promise((resolve, reject) => {
    models.Score.create({
        year,
        month,
        ProjectId: projectId,
        scoreType,
        description,
        raScore,
        riScore
      })
      .then((newScore) => {
        resolve(newScore);
      })
      .catch((err) => {
        reject(err);
      });
    }
));
const insertSHE = (year, month, projectId, workbook) => (
    new Promise((resolve, reject) => {
      const worksheet = workbook.getWorksheet(SHE_LABEL);
      const promises = [];
      
      models.Score.destroy(
        {
          where: { year, month, ProjectId: projectId, scoreType: 1},
        })
      .then((deleteResult) => {
        for(let i = 7; i <= 13; i += 1) {
            let description = worksheet.getCell(`D${i}`).value;
            let raScore = parseFloat(worksheet.getCell(`F${i}`).value);
            let riScore = parseFloat(worksheet.getCell(`E${i}`).value);
            
            promises.push(insertScore(year, month, projectId, 1, description, raScore, riScore));
        }

        Promise.all(promises)
        .then((result) => {
            resolve(result);
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

exports.insertScores = (year, month, code, workbook) => (
  new Promise((resolve, reject) => {
    const promises = [];
    models.Project.findOne({
      where: { code },
    })
    .then((project) => {
      promises.push(insertSHE(year, month, project.id, workbook));
      Promise.all(promises)
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        });
    });
  }
));
