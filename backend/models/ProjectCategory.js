// models/ProjectCategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path to your database configuration

const ProjectCategory = sequelize.define('ProjectCategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = ProjectCategory;
