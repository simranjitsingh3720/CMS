module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Datastore_Contents', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      schemaId: { type: Sequelize.UUID },
      schemaSlug: { type: Sequelize.STRING },
      status: { type: Sequelize.ENUM('draft', 'published') },
      order: { type: Sequelize.INTEGER },
      createdBy: { type: Sequelize.UUID },
      createdAt: { type: Sequelize.DATE },
      updatedBy: { type: Sequelize.UUID },
      updatedAt: { type: Sequelize.DATE },
      publishedBy: { type: Sequelize.UUID },
      publishedAt: { type: Sequelize.DATE },
      deletedBy: { type: Sequelize.UUID },
      deletedAt: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Datastore_Contents');
  },
};
