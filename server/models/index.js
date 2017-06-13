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
      console.log('in model GET: room is ', room);
      db.connection.query(queryString, (error, results, fields) => {
        if (error) {
          console.log('DB ERROR :', error);
        } 
        callback(error, results);
      });
    }, // a function which produces all the messages
    post: function (message, callback) {
      // inputs: username, roomname, text
      // check if the user exists
      let { username, roomname, text } = message;
      console.log(`GOT: user: ${username} room: ${roomname} text: ${text}`);
      let addUserCmd = `INSERT INTO users (name) values("${username}");`;
      let addRoomCmd = `INSERT INTO rooms (name) values("${roomname}");`;
      let addMessageCmd = 
        `INSERT INTO messages (text, room, user) values ("${message.text}", 
          (select rooms.id from rooms where rooms.name = "${message.roomname}"),
            (select users.id from users where users.name = "${message.username}"));`;
      sendSQLCommand(addUserCmd, (error, results) => {
        console.log('Woo! In POST: sending addUserCmd with results:', results);
        sendSQLCommand(addRoomCmd, (error, results) => {
          console.log('Woo! In POST: sending addRoomCmd with results:', results);
          sendSQLCommand(addMessageCmd, (error, results) => {
            console.log('Woo! In POST: sending addMessageCmd with results:', results);
            callback();
          });
        });
      });

//      sendSQLCommand(queryString, (error, results) => {
///        send2ndSQLCommand(2ndQueryString, (error, results) => {
//          send3rdSQLCommand(3rdQueryString, (error, results) => {
//            callback(error);
//        })
//      }
        // set user id from results

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

