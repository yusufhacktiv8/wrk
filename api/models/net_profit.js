'use strict';
module.exports = function(sequelize, DataTypes) {
  var NetProfit = sequelize.define('NetProfit', {
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    rkap: DataTypes.FLOAT,
    ra: DataTypes.FLOAT,
    ri: DataTypes.FLOAT,
    prognosa: DataTypes.FLOAT,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return NetProfit;
};
