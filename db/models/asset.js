const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    static associate(models) {
      models.Asset.belongsTo(models.User, { foreignKey: 'createdBy' });
      models.Asset.belongsTo(models.User, { foreignKey: 'updatedBy' });
      models.Asset.belongsTo(models.User, { foreignKey: 'deletedBy' });
    }
  }

  Asset.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      url: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING, require: true, allowNull: false },
      description: { type: DataTypes.STRING },
      type: { type: DataTypes.STRING, require: true, allowNull: false },
      mimeType: { type: DataTypes.STRING, require: true, allowNull: false },
      createdBy: { type: DataTypes.UUID, allowNull: false },
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
      modelName: 'Asset',
      tableName: 'Assets',
    },
  );

  return Asset;
};
