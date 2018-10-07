'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProjectProgress = sequelize.define('ProjectProgress', {
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    raProgress: DataTypes.FLOAT,
    riProgress: DataTypes.FLOAT,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  ProjectProgress.associate = function (models) {
    ProjectProgress.belongsTo(models.Project, { onDelete: 'restrict' });
  };

  return ProjectProgress;
};
