const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    static associate(models) {
      models.Content.belongsTo(models.Schema, { foreignKey: "schemaId" });
      models.Content.belongsTo(models.User, { foreignKey: "createdBy" });
      models.Content.belongsTo(models.User, { foreignKey: "updatedBy" });
      models.Content.belongsTo(models.User, { foreignKey: "deletedBy" });
      models.Content.belongsTo(models.User, { foreignKey: "publishedBy" });
    }
  }

  Content.init(
    {
      id: { type: DataTypes.UUID,primaryKey: true,defaultValue: DataTypes.UUIDV4 },
      schemaId: { type: DataTypes.UUID },
      data: { type: DataTypes.JSON },
      status: { type: DataTypes.STRING },
      createdBy: { type: DataTypes.UUID },
      publishedAt: { type: DataTypes.DATE },
      publishedBy: { type: DataTypes.UUID },
      deletedBy: { type: DataTypes.UUID },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: "Content",
      tableName: "datastore_contents",
    }
  );

  return Content;
};
