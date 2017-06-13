var db = require('../db');

db.connection.connect();

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
    post: function (message) {
      // inputs: username, roomname, text
      // 
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

