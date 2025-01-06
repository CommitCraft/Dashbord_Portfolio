// models/SkillCategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust the path to your database configuration

const SkillCategory = sequelize.define('SkillCategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = SkillCategory;
