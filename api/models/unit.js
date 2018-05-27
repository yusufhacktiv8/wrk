'use strict';
module.exports = function(sequelize, DataTypes) {
  var Unit = sequelize.define('Unit', {
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

  Unit.associate = function (models) {
    Unit.belongsTo(models.Category, { onDelete: 'restrict' });
    Unit.belongsTo(models.Revenue, { onDelete: 'restrict' });
  };

  return Unit;
};
