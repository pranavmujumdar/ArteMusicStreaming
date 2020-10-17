/**
 * This acts as an authorization middleware  where the api will grant 
 * authorization for the user (using the token in the token-configuration/app.js)
 * needs client id and the secret key from the spotify api now
 */

var request = require('request');


/**
 * Obtained an id and secret key from spotify developers account
 * 
 */
let clientId = '8173fa018b554d1c8d306e92da2c364b';
let clientSecret = '06356f82e3334a85b8b520aca5c57d6f';

// app request for Auth
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

/**
 * using access token in the body to request token
 */
request.post(authOptions, function (err, res, body) {
  if (!err && res.statusCode === 200) {
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/users/jmperezperez',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function (error, response, body) {
      console.log(body);
    });
  }
});