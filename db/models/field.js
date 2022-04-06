const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Field extends Model {
    static associate(models) {
      models.Field.belongsTo(models.Schema, { foreignKey: 'schemaId' });
      models.Field.belongsTo(models.Schema, { foreignKey: 'schemaSlug' });
      models.Field.belongsTo(models.User, { foreignKey: 'createdBy' });
      models.Field.belongsTo(models.User, { foreignKey: 'updatedBy' });
      models.Field.belongsTo(models.User, { foreignKey: 'deletedBy' });
    }
  }

  Field.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      schemaId: { type: DataTypes.UUID },
      schemaSlug: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING, allowNull: false },
      fieldId: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING },
      defaultValue: { type: DataTypes.STRING },
      isRequired: { type: DataTypes.BOOLEAN },
      type: { type: DataTypes.STRING, allowNull: false },
      appearanceType: { type: DataTypes.STRING, allowNull: false },
      Truelabel: { type: DataTypes.STRING },
      Falselabel: { type: DataTypes.STRING },
      options: { type: DataTypes.JSONB },
      order: { type: DataTypes.INTEGER, autoIncrement: true },
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
      modelName: 'Field',
      tableName: 'Datastore_Fields',
    },
  );

  return Field;
};
