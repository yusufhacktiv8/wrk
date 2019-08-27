const Excel = require('exceljs');
const moment = require('moment');
const models = require('../models');
const QMSL_LABEL = 'QMSL';
const QMSL_SCORE_TYPE = 1;
const SHE_LABEL = 'SHE';
const SHE_SCORE_TYPE = 2;
const R5_LABEL = '5R';
const R5_SCORE_TYPE = 3;


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

const insertScoreDetail = (year, month, projectId, workbook, label, scoreType, startIndex, endIndex) => (
    new Promise((resolve, reject) => {
      const worksheet = workbook.getWorksheet(label);
      const promises = [];
      
      models.Score.destroy(
        {
          where: { year, month, ProjectId: projectId, scoreType: scoreType},
        })
      .then((deleteResult) => {
        for(let i = startIndex; i <= endIndex; i += 1) {
            let description = worksheet.getCell(`D${i}`).value;
            let raScore = parseFloat(worksheet.getCell(`F${i}`).value);
            let riScore = parseFloat(worksheet.getCell(`E${i}`).value);
            
            promises.push(insertScore(year, month, projectId, scoreType, description, raScore, riScore));
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
      promises.push(insertScoreDetail(year, month, project.id, workbook, QMSL_LABEL, QMSL_SCORE_TYPE, 7, 14));
      promises.push(insertScoreDetail(year, month, project.id, workbook, SHE_LABEL, SHE_SCORE_TYPE, 7, 13));
      promises.push(insertScoreDetail(year, month, project.id, workbook, R5_LABEL, R5_SCORE_TYPE, 7, 9));
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
