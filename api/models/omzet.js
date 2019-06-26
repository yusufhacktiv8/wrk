'use strict';
module.exports = function(sequelize, DataTypes) {
  var Omzet = sequelize.define('Omzet', {
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    plan: DataTypes.FLOAT,
    actual: DataTypes.FLOAT,
    prognosa: DataTypes.FLOAT,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Omzet;
};
