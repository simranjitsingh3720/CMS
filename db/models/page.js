const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    static associate(models) {
      models.Page.belongsTo(models.User, { foreignKey: 'createdBy' });
      models.Page.belongsTo(models.User, { foreignKey: 'updatedBy' });
      models.Page.belongsTo(models.User, { foreignKey: 'publishedBy' });
      models.Page.belongsTo(models.User, { foreignKey: 'deletedBy' });
    }
  }
  Page.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      isHome: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0 },
      assets: { type: DataTypes.JSON },
      components: { type: DataTypes.JSON },
      css: { type: DataTypes.JSON },
      html: { type: DataTypes.JSON },
      styles: { type: DataTypes.JSON },
      status: { type: DataTypes.ENUM('draft', 'published'), allowNull: false, defaultValue: 'draft' },
      createdBy: { type: DataTypes.UUID, allowNull: false },
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
      modelName: 'Page',
      tableName: 'Pages',
    },
  );

  return Page;
};
