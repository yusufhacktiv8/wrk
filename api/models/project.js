'use strict';
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    code: { type: DataTypes.STRING, unique: true },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    givenBy: DataTypes.STRING,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    omzetKontrak: DataTypes.FLOAT,
    projectType: DataTypes.INTEGER,
    mp: DataTypes.STRING,
    keu: DataTypes.STRING,
    kom: DataTypes.STRING,
    eng: DataTypes.STRING,
    pelut: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Project;
};
