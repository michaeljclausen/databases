var mysql = require('mysql');
var Sequelize = require('sequelize');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
module.exports = {
  connection: mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'plantlife',
    database: 'chat'
  }),

  sequelize: new Sequelize('chat', 'root', 'plantlife', {
    host: '127.0.0.1',
    dialect: 'mysql'
  })

};

