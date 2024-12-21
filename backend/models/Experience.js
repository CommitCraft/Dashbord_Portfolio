const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Experience = sequelize.define("Experience", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  skills: {
    type: DataTypes.JSON, // Storing skills as a JSON array
    allowNull: false,
  },
  doc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Experience;
