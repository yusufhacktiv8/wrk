'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProjectData = sequelize.define('ProjectData', {
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    ok: DataTypes.FLOAT,
    ra: DataTypes.FLOAT,
    ri: DataTypes.FLOAT,
    piutangRetensi: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return ProjectData;
};
