var db = require('../db');

db.connection.connect();

const sendSQLCommand = function(SQLCommand, callback) {
  db.connection.query(SQLCommand, (error, results) => {
    if (error && error.errno !== 1062) { // 1062 : ER_DUP_ENTRY which is okay
      console.log('DB Error: ', error);
      callback(error, results);
    } else {
      callback(null, results);
    }
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
      console.log('handling GET: room is ', room);
      sendSQLCommand(queryString, (error, results) => {
        callback(error, results);
      });
    }, 
    post: function (message, callback) {
      let { username, roomname, text } = message;
      console.log(`GOT: user: ${username} room: ${roomname} text: ${text}`);
      let addUserCmd = `INSERT INTO users (name) values("${username}");`;
      let addRoomCmd = `INSERT INTO rooms (name) values("${roomname}");`;
      let addMessageCmd = 
        `INSERT INTO messages (text, room, user) values ("${message.text}", 
          (select rooms.id from rooms where rooms.name = "${message.roomname}"),
            (select users.id from users where users.name = "${message.username}"));`;
      sendSQLCommand(addUserCmd, (error, results) => {
        sendSQLCommand(addRoomCmd, (error, results) => {
          sendSQLCommand(addMessageCmd, (error, results) => {
            callback();
          });
        });
      });
    } 
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      const queryString = 'SELECT users.name from users;';
      sendSQLCommand(queryString, (error, results) => {
        callback(error, results);
      });
    },
    post: function (user, callback) {
      let addUserCmd = `INSERT INTO users (name) values("${user.username}");`;      
      sendSQLCommand(addUserCmd, (error, results) => {
        callback(error, results);
      });
    }
  }
};

