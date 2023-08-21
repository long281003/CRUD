const { Sequelize } = require('sequelize');
const db = require('../models/index')


const sequelize = new Sequelize('hoidanit', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307,
  logging: false
});



const connection = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
connection()