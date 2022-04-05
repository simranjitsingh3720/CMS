module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Datastore_Schemas', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      slug: { type: Sequelize.STRING, allowNull: false },
      title: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      createdBy: { type: Sequelize.UUID },
      createdAt: { type: Sequelize.DATE },
      updatedBy: { type: Sequelize.UUID },
      updatedAt: { type: Sequelize.DATE },
      deletedBy: { type: Sequelize.UUID },
      deletedAt: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Datastore_Schemas');
  },
};
