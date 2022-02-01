const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    static associate(models) {
      models.Content.belongsTo(models.Schema, {
        foreignKey: {
          name: "schema_id",
          type: DataTypes.UUID,
          allowNull: false,
        },
      });
      models.Content.belongsTo(models.User, {
        foreignKey: {
          name: "created_by",
          type: DataTypes.UUID,
          allowNull: false,
        },
      });
      models.Content.belongsTo(models.User, {
        foreignKey: {
          name: "updated_by",
          type: DataTypes.UUID,
          allowNull: false,
        },
      });
      models.Content.belongsTo(models.User, {
        foreignKey: {
          name: "deleted_by",
          type: DataTypes.UUID,
          allowNull: false,
        },
      });
      models.Content.belongsTo(models.User, {
        foreignKey: {
          name: "published_by",
          type: DataTypes.UUID,
          allowNull: false,
        },
      });
    }
  }

  Content.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      schema_id: { type: DataTypes.UUID, allowNull: false },
      data: { type: DataTypes.JSON },
      status: { type: DataTypes.STRING },
      created_by: { type: DataTypes.UUID, allowNull: false },
      published_at: { type: DataTypes.DATE },
      published_by: { type: DataTypes.UUID },
      deleted_by: { type: DataTypes.UUID },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: "Content",
      tableName: "datastore_contents",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return Content;
};
