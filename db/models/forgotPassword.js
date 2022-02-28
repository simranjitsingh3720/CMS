const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ForgotPassword extends Model {
    static associate(models) {
      models.ForgotPassword.belongsTo(models.User, { foreignKey: 'user' });
    }
  }
  ForgotPassword.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user: { type: DataTypes.UUID, allowNull: false },
      expiresAt: { type: DataTypes.DATE, allowNull: false },
      // isEarlier: { type: DataTypes.BOOLEAN, allowNull: false },
      // isUsed: { type: DataTypes.BOOLEAN, allowNull: false },
      isValid: { type: DataTypes.BOOLEAN, allowNull: false },
      createdBy: { type: DataTypes.UUID },
      createdAt: { type: DataTypes.DATE },
      updatedBy: { type: DataTypes.UUID },
      updatedAt: { type: DataTypes.DATE },
      deletedBy: { type: DataTypes.UUID },
      deletedAt: { type: DataTypes.DATE },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: 'ForgotPassword',
      tableName: 'ForgotPasswords',
    },
  );
  return ForgotPassword;
};
