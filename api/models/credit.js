'use strict';
module.exports = function(sequelize, DataTypes) {
  var Credit = sequelize.define('Credit', {
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    pu: DataTypes.FLOAT,
    tb: DataTypes.FLOAT,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Credit;
};
