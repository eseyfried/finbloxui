'use strict';
const  { v4:uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Group, { through: models.UserGroup, as: 'Groups', sourceKey: "id", foreignKey: 'userId', otherKey: 'groupId' })
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    organizationName: DataTypes.STRING,
    email: DataTypes.STRING,
    licenseKey: {
        type: DataTypes.UUIDV4,
        defaultValue: () => uuidv4()
    },
    licenseExpiresAt: DataTypes.DATEONLY,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });
  return User;
};