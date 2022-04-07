module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserDemoPreferences', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      userId: {
        type: Sequelize.UUID,
      },
      asset: {
        type: Sequelize.BOOLEAN,
      },
      pageManager: {
        type: Sequelize.BOOLEAN,
      },
      datastore: {
        type: Sequelize.BOOLEAN,
      },
      datastoreContents: {
        type: Sequelize.BOOLEAN,
      },
      datastoreStructure: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('UserDemoPreferences');
  },
};
