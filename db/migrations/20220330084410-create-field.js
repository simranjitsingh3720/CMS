module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Datastore_Fields', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      schemaId: { type: Sequelize.UUID },
      schemaSlug: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING, allowNull: false },
      fieldId: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING },
      defaultValue: { type: Sequelize.STRING },
      isRequired: { type: Sequelize.BOOLEAN },
      type: { type: Sequelize.STRING, allowNull: false },
      appearanceType: { type: Sequelize.STRING, allowNull: false },
      options: { type: Sequelize.JSONB },
      Truelabel: { type: Sequelize.STRING },
      Falselabel: { type: Sequelize.STRING },
      order: { type: Sequelize.INTEGER, autoIncrement: true },
      createdBy: { type: Sequelize.UUID },
      createdAt: { type: Sequelize.DATE },
      updatedBy: { type: Sequelize.UUID },
      updatedAt: { type: Sequelize.DATE },
      deletedBy: { type: Sequelize.UUID },
      deletedAt: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Datastore_Fields');
  },
};
