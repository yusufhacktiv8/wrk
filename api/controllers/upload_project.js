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

const DATE_PATTERN = 'DD/MM/YYYY HH:mm:ss';

exports.insertProject = (year, month, code, workbook) => (
    new Promise((resolve, reject) => {
      const worksheet = workbook.getWorksheet(PROYEK_DATA_UMUM);

      // TODO Replace this after fixing the excel template
      // code = 'PRJ001';

      let projectType = worksheet.getCell('E3').value;
      let name = worksheet.getCell('E5').value;
      let givenBy = worksheet.getCell('E6').value;
      let address = worksheet.getCell('E10').value;
      let omzetKontrak = worksheet.getCell('E14').value;
      let startDateStr = worksheet.getCell('E18').value;
      let endDateStr = worksheet.getCell('E19').value;
      let startDate = moment(startDateStr, DATE_PATTERN).toDate();
      let endDate = moment(endDateStr, DATE_PATTERN).toDate();
      // console.log('------------> ', startDateStr);
      // console.log('------------> ', startDate);
      
      let mp = worksheet.getCell('E21').value;
      let keu = worksheet.getCell('E22').value;
      let kom = worksheet.getCell('E23').value;
      let eng = worksheet.getCell('E24').value;

      let ra = worksheet.getCell('E28').value;
      let ri = worksheet.getCell('E29').value;
      let raProgress = worksheet.getCell('E26').value;
      let riProgress = worksheet.getCell('E27').value;
      let pdp = worksheet.getCell('E31').value;
      let bad = worksheet.getCell('E32').value;
      let ok = worksheet.getCell('E33').value;
      let piutangUsaha = worksheet.getCell('E34').value;
      let piutangRetensi = worksheet.getCell('E35').value;
      let tagihanBruto = worksheet.getCell('E36').value;
      let persediaan = worksheet.getCell('E37').value;
      let cashflow = worksheet.getCell('E38').value;
      let persekot = worksheet.getCell('E39').value;
      let labaKotor = worksheet.getCell('E40').value;

      let projectProgress = {
        year,
        month,
        ra,
        ri,
        raProgress,
        riProgress,
        pdp,
        bad,
        ok,
        piutangUsaha,
        piutangRetensi,
        tagihanBruto,
        persediaan,
        cashflow,
        persekot,
        labaKotor,
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
            endDate,
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
            }, { ProjectId: project.id, month, year })
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
            endDate,
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