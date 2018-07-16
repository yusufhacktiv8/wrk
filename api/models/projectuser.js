'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProjectUser = sequelize.define('ProjectUser', {
    code: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  ProjectUser.associate = function (models) {
    ProjectUser.belongsTo(models.User, { onDelete: 'restrict' });
    ProjectUser.belongsTo(models.Project, { onDelete: 'restrict' });
  };
  return ProjectUser;
};
