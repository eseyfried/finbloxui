'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Packages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Packages.init({
    packageName: {
        type: DataTypes.STRING,
        defaultValue: () => "@finbloxui/finbloxui"
    },
    packageVersion: {
        type: DataTypes.STRING,
        required: true
    },
    fileName: {
        type: DataTypes.STRING,
        // defaultValue: () => `finbloxui-${this.getDataValue('packageVersion')}.tgz`,
        set(value) {
            this.setDataValue('fileName',  `finbloxui-${this.getDataValue('packageVersion')}.tgz`);
          }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Packages',
    paranoid: true,
  });
  return Packages;
};