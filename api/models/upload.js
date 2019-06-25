'use strict';
module.exports = function(sequelize, DataTypes) {
  var Upload = sequelize.define('Upload', {
    code: { type: DataTypes.STRING, unique: true },
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Upload;
};
