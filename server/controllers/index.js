var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      // get room from query string
      // TBD: get the sort parameter from the request body
      //      get max messages from the request body
      // calls model.get()
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // get the username from the query string
      // get the room from the query string
      // get the message text from the request body
      // calls model.post() with the above
      // send appropriate response code
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

