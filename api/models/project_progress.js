'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProjectProgress = sequelize.define('ProjectProgress', {
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    raProgress: DataTypes.FLOAT,
    riProgress: DataTypes.FLOAT,
    ra: DataTypes.FLOAT,
    ri: DataTypes.FLOAT,
    pdp: DataTypes.FLOAT,
    bad: DataTypes.FLOAT,
    ok: DataTypes.FLOAT,
    cashflow: DataTypes.FLOAT,
    piutangUsaha: DataTypes.FLOAT,
    piutangRetensi: DataTypes.FLOAT,
    tagihanBruto: DataTypes.FLOAT,
    persediaan: DataTypes.FLOAT,
    persekot: DataTypes.FLOAT,
    labaKotor: DataTypes.FLOAT,
  }, {
    getterMethods: {
      deviasi() {
        return this.ra - this.ri;
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  ProjectProgress.associate = function (models) {
    ProjectProgress.belongsTo(models.Project, { onDelete: 'restrict' });
  };

  return ProjectProgress;
};
