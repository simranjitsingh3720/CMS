const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ContentData extends Model {
    static associate(models) {
      models.ContentData.belongsTo(models.Content, { foreignKey: 'contentId' });
      models.ContentData.belongsTo(models.User, { foreignKey: 'createdBy' });
      models.ContentData.belongsTo(models.User, { foreignKey: 'updatedBy' });
      models.ContentData.belongsTo(models.User, { foreignKey: 'deletedBy' });
      models.ContentData.belongsTo(models.User, { foreignKey: 'publishedBy' });
    }
  }

  ContentData.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      contentId: { type: DataTypes.UUID },
      attributeKey: { type: DataTypes.STRING(9999) },
      attributeValue: { type: DataTypes.STRING(999999) },
      createdBy: { type: DataTypes.UUID },
      createdAt: { type: DataTypes.DATE },
      updatedBy: { type: DataTypes.UUID },
      updatedAt: { type: DataTypes.DATE },
      publishedBy: { type: DataTypes.UUID },
      publishedAt: { type: DataTypes.DATE },
      deletedBy: { type: DataTypes.UUID },
      deletedAt: { type: DataTypes.DATE },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: 'ContentData',
      tableName: 'Datastore_ContentData',
    },
  );

  return ContentData;
};
