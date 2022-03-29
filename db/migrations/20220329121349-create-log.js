module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Logs', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      actionName: { type: Sequelize.STRING },
      performedBy: { type: Sequelize.STRING },
      objectId: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Logs');
  },
};
