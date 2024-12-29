const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const VALID_CATEGORIES = ['ALL', 'Full-Stack', 'Frontend', "Mini-Project's", "Android App's"];

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [VALID_CATEGORIES],
        msg: `Category must be one of: ${VALID_CATEGORIES.join(', ')}`,
      },
    },
  },
  github: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  webapp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Project;
