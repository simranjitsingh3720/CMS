const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Schema extends Model {
    static associate(models) {
      models.Schema.belongsTo(models.User, { foreignKey: "createdBy" });
      models.Schema.belongsTo(models.User, { foreignKey: "updatedBy" });
      models.Schema.belongsTo(models.User, { foreignKey: "deletedBy" });
      models.Schema.belongsTo(models.User, { foreignKey: "publishedBy" });
    }
  }

  Schema.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      slug: { type: DataTypes.STRING },
      schema: { type: DataTypes.JSON },
      title: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING },
      publishedAt: { type: DataTypes.DATE },
      publishedBy: { type: DataTypes.UUID },
      createdBy: { type: DataTypes.UUID },
      updatedBy: { type: DataTypes.UUID },
      deletedBy: { type: DataTypes.UUID },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: "Schema",
      tableName: "datastore_schemas",
    }
  );

  return Schema;
};
