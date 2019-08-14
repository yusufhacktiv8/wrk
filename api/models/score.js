'use strict';
module.exports = function(sequelize, DataTypes) {
  var Score = sequelize.define('Score', {
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    scoreType: DataTypes.INTEGER,
    raScore: DataTypes.FLOAT,
    riScore: DataTypes.FLOAT,
    description: DataTypes.STRING,
    scoreSeq: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Score.associate = function (models) {
    Score.belongsTo(models.Project, { onDelete: 'restrict' });
  };

  return Score;
};
