'use strict';
module.exports = function(sequelize, DataTypes) {
  var SmwgItem = sequelize.define('SmwgItem', {
    code: { type: DataTypes.STRING },
    name: DataTypes.STRING,
    bobot: DataTypes.FLOAT,
    nilai: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  SmwgItem.associate = function (models) {
    SmwgItem.belongsTo(models.Smwg, { onDelete: 'restrict' });
  };

  return SmwgItem;
};
