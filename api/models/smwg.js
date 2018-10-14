'use strict';
module.exports = function(sequelize, DataTypes) {
  var Smwg = sequelize.define('Smwg', {
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    smwgType: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Smwg.associate = function (models) {
    Smwg.belongsTo(models.Project, { onDelete: 'restrict' });
  };

  return Smwg;
};
