const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Schema extends Model {
    static associate(models) {
      models.Schema.belongsTo(models.User, { foreignKey: 'createdBy' });
      models.Schema.belongsTo(models.User, { foreignKey: 'updatedBy' });
      models.Schema.belongsTo(models.User, { foreignKey: 'deletedBy' });
    }
  }

  Schema.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      slug: { type: DataTypes.STRING, allowNull: false },
      title: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
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
      modelName: 'Schema',
      tableName: 'Datastore_Schemas',
    },
  );

  return Schema;
};
