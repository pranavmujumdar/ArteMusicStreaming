/**
 * This file Contains the configuration for the API Token and all the requests
 */



/**
 * port number
 * Enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
 * Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
 * Node's querystring module for all engines.
 * 
 */
const express = require('express'), //Using Express framework for application ease of routing
  port = process.env.PORT || 3000,
  app = express(),
  cookieParser = require('cookie-parser'), //https://www.npmjs.com/package/cookie-parser
  request = require('request'),
  querystring = require('querystring'),
  hostname ="localhost",
  stateKey = 'spotify_auth_state';
  redirectUri = "http://localhost:4200";
/**
 * Api auth key from spotify
 */
const clientId = '8173fa018b554d1c8d306e92da2c364b';
const clientSecret = '06356f82e3334a85b8b520aca5c57d6f';
/**
 * @function stringGenerator
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} text The generated string
 * to store the state of the application
 */
let stringGenerator = (length) => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
/**
 * Setting headers to avoid cors
 * 
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  next();
})

/**
 * Getting authorization for this application from spotify 
 */
app.get('/login', function (req, res) {
  var state = stringGenerator(16);
  res.cookie(stateKey, state);
  let scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'token',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state
    }));
});


/**
 * @function app.use() using path to manage the cookies 
 */
var path = require('path');
app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

/**
 * @function app.get('/callback') this is the call backpath to which the api will send it to after login
 * based on the state parameter we will request refresh access tokens
 */
app.get('/callback', function (req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function (err, res, body) {
      if (!err && res.statusCode === 200) {

        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});
/**
 * For getting the token from refresh token
 */
app.get('/refresh_token', function (req, res) {
  var refreshToken = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});
app.listen(port, hostname, () => {
  console.log(`Middleware is up on port ${port}`);
})