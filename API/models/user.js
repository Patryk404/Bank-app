
const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bill: {
      type: Sequelize.STRING,
      allowNull: false  
    },
    cash: { 
        type: Sequelize.FLOAT,
        defaultValue: 0
    }
})

module.exports = User;
/*const sequelize = require('sequelize');
const Model = sequelize.Model;

module.exports = (DataTypes)
class User extends Model {}
User.init({
    id: {
        type: sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: sequelize.STRING,
        allowNull: false
    },
    login: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    cash: { 
        type: sequelize.NUMBER
    },
},
{
    sequelize,
    modelName: 'user'
}
);

module.exports = User;*/