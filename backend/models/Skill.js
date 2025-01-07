const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./SkillCategory');

const Skill = sequelize.define('Skill', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'skills',
  timestamps: true,
});

// Association
Skill.belongsTo(Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Category.hasMany(Skill, { foreignKey: 'categoryId' });

module.exports = Skill;
