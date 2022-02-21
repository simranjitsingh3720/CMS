module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('datastore_contents', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      schemaId: {
        type: Sequelize.UUID,
        references: {
          model: 'datastore_schemas',
          key: 'id',
        },
      },
      data: { type: Sequelize.JSON },
      status: { type: Sequelize.ENUM('draft', 'published') },
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
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('datastore_contents');
  },
};
