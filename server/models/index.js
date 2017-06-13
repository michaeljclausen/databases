var db = require('../db');

db.connection.connect();

const sendSQLCommand = function(SQLCommand, callback) {
  db.connection.query(SQLCommand, (error, results) => {
    if (error) {
      console.log('DB Error: ', error);
    }
    callback(error, results);
  });
};

module.exports = {
  messages: {
    get: function (queries, callback) {
      // inputs:
      //    TBD: sorting order
      //    TBD: max messages
      //    room
      // return SELECT * in messages table which match room=roomname
      // queries will have USERNAME and/or ROOM set
      const room = (queries && queries.roomname) ? queries.roomname : 'lobby';
      const queryString = `SELECT * from messages m INNER JOIN rooms r ON r.id = m.room where r.name = "${room}";`;
      console.log('in model GET: room is ', room);
//      db.connection.connect();
      db.connection.query(queryString, (error, results, fields) => {
        if (error) {
          console.log('DB ERROR :', error);
        } 
        callback(error, results);
//        db.connection.end();
      });
    }, // a function which produces all the messages
    post: function (message, callback) {
      // inputs: username, roomname, text
      // check if the user exists
      let { username, roomname, text } = message;
      console.log(`GOT: user: ${username} room: ${roomname} text: ${text}`);
      let queryString = `SELECT * from users where users.name = "${username}";`;
      sendSQLCommand(queryString, (error, results) => {
        if (error) {
          callback(error);
        }
        if (results.length === 0) {
          // do insert
          let queryString = `INSERT into users (name) values ("${username}");`;
        }
        // set user id from results
        let queryString = `SELECT * from rooms where rooms.name = "${roomname}";`;
        sendSQLCommand(queryString, (error, results) => {
          if (error) {
            callback(error);
          }
          if (results.length === 0) {
            // do insert of room
          }
          // set room id from results
          let insertCommand = 
            `INSERT INTO messages (text, room, user) values ("${message.text}", 
              (select rooms.id from rooms where rooms.name = "${message.roomname}"),
                (select users.id from users where users.name = "${message.username}"));`;
          sendSQLCommand(insertCommand, (error) => {
            callback(error);
          });  
        });
      });
          // if not add record of user
          // check if room exists
            // if not add record of room
            // add record of message
            
            // callback(error, results);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

