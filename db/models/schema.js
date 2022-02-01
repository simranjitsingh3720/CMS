const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Schema extends Model {
    static associate(models) {
      // models.Schema.hasMany(models.Content);

      models.Schema.belongsTo(models.User, {
        foreignKey: {
          name: "created_by",
          type: DataTypes.UUID,
          allowNull: false,
        },
      });
      models.Schema.belongsTo(models.User, {
        foreignKey: {
          name: "updated_by",
          type: DataTypes.UUID,
          allowNull: false,
        },
      });
      models.Schema.belongsTo(models.User, {
        foreignKey: {
          name: "deleted_by",
          type: DataTypes.UUID,
          allowNull: false,
        },
      });
      models.Schema.belongsTo(models.User, {
        foreignKey: {
          name: "published_by",
          type: DataTypes.UUID,
          allowNull: false,
        },
      });
    }
  }

  Schema.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      slug: { type: DataTypes.STRING, allowNull: false },
      schema: { type: DataTypes.JSON, allowNull: false },
      title: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING },
      published_at: { type: DataTypes.DATE },
      published_by: { type: DataTypes.UUID },
      created_by: { type: DataTypes.UUID, allowNull: false },
      updated_by: { type: DataTypes.UUID },
      deleted_by: { type: DataTypes.UUID },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: "Schema",
      tableName: "datastore_schemas",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return Schema;
};
