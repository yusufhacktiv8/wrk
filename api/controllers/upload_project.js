const Excel = require('exceljs');
const models = require('../models');

const PROYEK_DATA_UMUM = 'Proyek Data Umum';

exports.insertProject = insertOmzet = (year, month, code, workbook) => (
    new Promise((resolve, reject) => {
      const worksheet = workbook.getWorksheet(PROYEK_DATA_UMUM);

      // TODO Replace this after fixing the excel template
      code = 'PRJ001';

      let projectType = worksheet.getCell('E3').value;
      let name = worksheet.getCell('E5').value;
      
      models.Project.findOne({
        where: { code },
      })
      .then((project) => {
        if (project != null) {
          models.Project.update({
            name,
          },
          {
            where: { code },
          })
          .then((project) => {
            resolve(project);
          })
        } else {
          models.Project.create({
            code,
            name,
            projectType: projectType === 'EPC' ? 1 : 2,
          })
          .then((project) => {
            resolve(project);
          })
        }
      })
      .catch((err) => {
        reject(err);
      });
    })
  );