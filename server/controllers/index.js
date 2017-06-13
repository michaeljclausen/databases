var models = require('../models');
var url = require('url');

const getBody = (req, res) => {
  let body = '';
  req.on('data', (chunk) => body += chunk);
  req.on('end', () => {
    return body;
  });
};

module.exports = {
  messages: {
    get: function (req, res) {
      // get room from query string
      // TBD: get the sort parameter from the request body
      //      get max messages from the request body
      const queryStrings = url.parse(req.url).query.split('&');
      const queries = {};
      queryStrings.forEach((tuple) => {
        let pair = tuple.split('=');
        queries[pair[0]] = pair[1];
      });
      res.end();
      models.messages.get(queries);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // get the username from the query string
      // get the room from the query string
      // get the message text from the request body
      // calls model.post() with the above
      // send appropriate response code
      const reqPath = url.parse(req.url);
      let body = getBody(req, res);
      res.end();
      models.messages.post(JSON.parse(body));
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};



