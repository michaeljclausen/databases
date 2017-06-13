/* You'll need to
 *   npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'plantlife', {
  host: 'localhost',
  dialect: 'mysql'
  // pool: { max: 5, min: 0, idle: 1000 }
});

/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */

var user = db.define('user', {
  name: Sequelize.STRING
});

var message = db.define('message', {
  user: Sequelize.INTEGER,
  text: Sequelize.STRING,
  room: Sequelize.INTEGER
});

var room = db.define('room', {
  name: Sequelize.STRING
});

/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */

user.sync()
  .then(function() {
    // Now instantiate an object and save it:
    return user.create({name: 'Jean Valjean Van Damme 3'});
  })
  .then(function() {
    // Retrieve objects from the database:
//    return user.findAll({ where: {name: 'Jean Valjean'} });
    return user.findAll();
  })
  .then(function(users) {
    users.forEach(function(user) {
      console.log(user.name + ' exists');
    });
    db.close();
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
    db.close();
  });
