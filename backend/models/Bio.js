const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Bio = sequelize.define('Bio', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 roles: {
  type: DataTypes.JSON, // Store roles as a JSON array
  allowNull: false,
},
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  github: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resume: {
    type: DataTypes.STRING, // File path
    allowNull: true,
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  twitter: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  insta: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  facebook: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Bio;
