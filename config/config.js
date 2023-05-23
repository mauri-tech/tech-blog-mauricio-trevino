const Sequelize = require('sequelize');
require('dotenv').config();

// Create a connection to the database
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL) // If JAWSDB_URL is available, use it for the connection
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }); // Otherwise, use the environment variables for the connection details

module.exports = sequelize;