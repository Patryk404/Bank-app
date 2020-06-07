require('dotenv').config();
const db_Url = process.env.DATABASE_URL;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(db_Url);


module.exports = sequelize;