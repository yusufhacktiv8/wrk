'use strict';
module.exports = function(sequelize, DataTypes) {
  var SmwgTemplate = sequelize.define('SmwgTemplate', {
    code: { type: DataTypes.STRING },
    name: DataTypes.STRING,
    bobot: DataTypes.FLOAT,
    itemType: DataTypes.INTEGER,
    smwgType: DataTypes.INTEGER,
    smwgSequence: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return SmwgTemplate;
};
