'use strict';
module.exports = function(sequelize, DataTypes) {
  var Progress = sequelize.define('Progress', {
    year: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    username: DataTypes.STRING,
    key: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Progress;
};
