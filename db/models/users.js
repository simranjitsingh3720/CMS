const { DataTypes } = require("sequelize");
const sequelize = require("../../server/services/sequelize");

const Datastore_content = sequelize.define(
  "datastore_content",
  {
    schema_id: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    data: {
      type: DataTypes.JSON,
    },
    schema_id: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
    },
    createdBy: {
      type: DataTypes.STRING,
    },
    publishedAt: {
      type: DataTypes.DATE,
    },
    publishedBy: {
      type: DataTypes.STRING,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
    deletedBy: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
  }
);

module.exports = Datastore_content;
