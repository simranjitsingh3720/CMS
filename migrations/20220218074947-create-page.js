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
          unique: true,
        },
        data: { type: Sequelize.JSON },
        status: { type: Sequelize.ENUM('draft', 'published'), allowNull: false, defaultValue: 'draft' },
        createdBy: {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        createdAt: { type: Sequelize.DATE },
        updatedBy: {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        updatedAt: { type: Sequelize.DATE },
        publishedBy: {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        publishedAt: { type: Sequelize.DATE },
        deletedBy: {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        deletedAt: { type: Sequelize.DATE },
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pages');
  },
};
