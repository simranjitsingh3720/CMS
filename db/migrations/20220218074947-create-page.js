module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Pages',
      {
        id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        slug: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        isHome: { type: Sequelize.BOOLEAN, allowNull: false },
        assets: { type: Sequelize.JSON },
        components: { type: Sequelize.JSON },
        css: { type: Sequelize.JSON },
        html: { type: Sequelize.JSON },
        styles: { type: Sequelize.JSON },
        status: { type: Sequelize.ENUM('draft', 'published'), allowNull: false, defaultValue: 'draft' },
        createdBy: { type: Sequelize.UUID },
        createdAt: { type: Sequelize.DATE },
        updatedBy: { type: Sequelize.UUID },
        updatedAt: { type: Sequelize.DATE },
        publishedBy: { type: Sequelize.UUID },
        publishedAt: { type: Sequelize.DATE },
        deletedBy: { type: Sequelize.UUID },
        deletedAt: { type: Sequelize.DATE },
      },
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Pages');
  },
};
