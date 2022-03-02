module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'assets',
      {
        id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
        url: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING },
        mimeType: { type: Sequelize.STRING },
        createdBy: { type: Sequelize.UUID },
        createdAt: { type: Sequelize.DATE },
        updatedBy: { type: Sequelize.UUID },
        updatedAt: { type: Sequelize.DATE },
        deletedBy: { type: Sequelize.UUID },
        deletedAt: { type: Sequelize.DATE },
      },
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable('assets');
  },
};
