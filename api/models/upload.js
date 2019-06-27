'use strict';
module.exports = function(sequelize, DataTypes) {
  var Upload = sequelize.define('Upload', {
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    sheetType: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Upload;
};
