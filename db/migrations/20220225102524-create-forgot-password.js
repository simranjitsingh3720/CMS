module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ForgotPasswords', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      user: { type: Sequelize.UUID, allowNull: false },
      expiresAt: { type: Sequelize.DATE, allowNull: false },
      isEarlier: { type: Sequelize.BOOLEAN, allowNull: false },
      isUsed: { type: Sequelize.BOOLEAN, allowNull: false },
      createdBy: { type: Sequelize.UUID },
      createdAt: { type: Sequelize.DATE },
      updatedBy: { type: Sequelize.UUID },
      updatedAt: { type: Sequelize.DATE },
      deletedBy: { type: Sequelize.UUID },
      deletedAt: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('ForgotPasswords');
  },
};
