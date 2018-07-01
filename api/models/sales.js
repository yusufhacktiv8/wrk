'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sales = sequelize.define('Sales', {
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    plan: DataTypes.FLOAT,
    actual: DataTypes.FLOAT,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Sales;
};
