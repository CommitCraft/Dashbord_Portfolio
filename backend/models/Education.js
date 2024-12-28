const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Education = sequelize.define('Education', {
  school: { type: DataTypes.STRING, allowNull: false },
  degree: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.STRING, allowNull: false },
  grade: { type: DataTypes.STRING, allowNull: true },
  desc: { type: DataTypes.TEXT, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: true }, // File path for uploaded image
});

module.exports = Education;
