const Excel = require('exceljs');
const moment = require('moment');
const models = require('../models');

const PROYEK_DATA_UMUM = 'Proyek Data Umum';

function insertUpdateProjectProgress(values, condition) {
  return models.ProjectProgress
      .findOne({ where: condition })
      .then(function(obj) {
          if(obj) { // update
              return obj.update(values);
          }
          else { // insert
              return models.ProjectProgress.create(values);
          }
      })
}


exports.insertProject = insertOmzet = (year, month, code, workbook) => (
    new Promise((resolve, reject) => {
      const worksheet = workbook.getWorksheet(PROYEK_DATA_UMUM);

      // TODO Replace this after fixing the excel template
      code = 'PRJ001';

      let projectType = worksheet.getCell('E3').value;
      let name = worksheet.getCell('E5').value;
      let givenBy = worksheet.getCell('E6').value;
      let address = worksheet.getCell('E10').value;
      let omzetKontrak = worksheet.getCell('E14').value;
      let startDateStr = worksheet.getCell('E18').value;
      let startDate = moment(startDateStr, 'DD/MM/YYYY HH:mm:ss').toDate();
      console.log('------------> ', startDateStr);
      console.log('------------> ', startDate);
      
      let mp = worksheet.getCell('E21').value;
      let keu = worksheet.getCell('E22').value;
      let kom = worksheet.getCell('E23').value;
      let eng = worksheet.getCell('E24').value;

      let riProgress = worksheet.getCell('E29').value;

      let projectProgress = {
        year,
        month,
        riProgress,
      }
      
      models.Project.findOne({
        where: { code },
      })
      .then((project) => {
        if (project != null) {
          models.Project.update({
            name,
            givenBy,
            address,
            omzetKontrak,
            startDate,
            mp,
            keu,
            kom,
            eng,
          },
          {
            where: { code },
          })
          .then(() => {
            insertUpdateProjectProgress({
              ProjectId: project.id,
              ...projectProgress,
            }, { ProjectId: project.id })
            .then(() => {
              resolve(project);
            });
          })
        } else {
          models.Project.create({
            code,
            name,
            projectType: projectType === 'EPC' ? 1 : 2,
            givenBy,
            address,
            omzetKontrak,
            startDate,
            mp,
            keu,
            kom,
            eng,
          })
          .then((createdProject) => {
            insertUpdateProjectProgress({
              ProjectId: createdProject.id,
              ...projectProgress,
            }, { ProjectId: null })
            .then(() => {
              resolve(project);
            });
          })
        }
      })
      .catch((err) => {
        reject(err);
      });
    })
  );