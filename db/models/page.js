const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    static associate(models) {
      models.Schema.belongsTo(models.User, { foreignKey: "createdBy" });
      models.Schema.belongsTo(models.User, { foreignKey: "updatedBy" });
      models.Schema.belongsTo(models.User, { foreignKey: "publishedBy" });
    }
  }

  Page.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      name: { type: DataTypes.STRING },
      slug: { type: DataTypes.STRING },
      data: { type: DataTypes.JSON },
      status: { type: DataTypes.ENUM("draft","published") },
      createdBy: { type: DataTypes.UUID },
      createdAt: { type: DataTypes.DATE },
      updatedBy: { type: DataTypes.UUID },
      updatedAt: { type: DataTypes.DATE },
      publishedBy: { type: DataTypes.UUID },
      publishedAt: { type: DataTypes.DATE },
      deletedBy: { type: DataTypes.UUID },
      deletedAt: { type: DataTypes.DATE }
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: "Page",
      tableName: "pages",
    }
  );

  return Page;
};