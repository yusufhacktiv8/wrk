'use strict';
module.exports = function(sequelize, DataTypes) {
  var Revenue = sequelize.define('Revenue', {
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Revenue;
};
