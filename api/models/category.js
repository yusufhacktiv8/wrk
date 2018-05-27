'use strict';
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    code: { type: DataTypes.STRING, unique: true },
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Category.associate = function (models) {
    Category.belongsTo(Category, { as: 'parent', onDelete: 'restrict' });
  };

  return Category;
};
