const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ContentData extends Model {
    static associate(models) {
      models.ContentData.belongsTo(models.Schema, { foreignKey: 'schemaId' });
      models.ContentData.belongsTo(models.Content, { foreignKey: 'contentId' });
      models.ContentData.belongsTo(models.Schema, { foreignKey: 'schemaSlug' });
      models.ContentData.belongsTo(models.User, { foreignKey: 'createdBy' });
      models.ContentData.belongsTo(models.User, { foreignKey: 'updatedBy' });
      models.ContentData.belongsTo(models.User, { foreignKey: 'deletedBy' });
      models.ContentData.belongsTo(models.User, { foreignKey: 'publishedBy' });
    }
  }

  ContentData.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      schemaId: { type: DataTypes.UUID },
      contentId: { type: DataTypes.UUID },
      schemaSlug: { type: DataTypes.STRING },
      attributeKey: { type: DataTypes.STRING },
      attributeValue: { type: DataTypes.STRING },
      attributeApperanceType: { type: DataTypes.STRING },
      attributeType: { type: DataTypes.STRING },
      status: { type: DataTypes.ENUM('draft', 'published') },
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
