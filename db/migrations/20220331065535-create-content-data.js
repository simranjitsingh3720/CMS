module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Datastore_ContentData', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      schemaId: { type: Sequelize.UUID },
      contentId: { type: Sequelize.UUID },
      schemaSlug: { type: Sequelize.STRING },
      attributeKey: { type: Sequelize.STRING },
      attributeValue: { type: Sequelize.STRING },
      attributeApperanceType: { type: Sequelize.STRING },
      attributeType: { type: Sequelize.STRING },
      status: { type: Sequelize.ENUM('draft', 'published') },
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
