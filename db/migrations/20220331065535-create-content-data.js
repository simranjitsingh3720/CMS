module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Datastore_ContentData', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      contentId: { type: Sequelize.UUID },
      attributeKey: { type: Sequelize.STRING(9999) },
      attributeValue: { type: Sequelize.STRING(999999) },
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
    await queryInterface.dropTable('Datastore_ContentData');
  },
};
