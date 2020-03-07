const express = require('express');
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const cryptoRandomString = require('crypto-random-string');
require('dotenv').config();

const client_id = process.env.CLIENT_ID;
const client_id_secret = process.env.CLIENT_ID_SECRET;
const redirect_uri = 'http://localhost:8080/callback';
let access_token = null;
let refresh_token = null;

const app = express();
const port = 8080;

const stateKey = 'spotify_auth_state';

app
  .use(express.static(__dirname + '/public', {extensions: ['html']}))
  .use(cors())
  .use(cookieParser());

app.get('/spotify', (req, res) => {
  const scopes = 'user-read-private user-read-email';
  const state = cryptoRandomString({length: 16, type: 'base64'});
  res.cookie(stateKey, state);
  res.redirect('https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scopes,
      redirect_uri: redirect_uri,
      state: state
    })
  );
});

app.get('/callback', (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    console.log(state + " This is the state");
    console.log(storedState + " This is the stored state");
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch'
        })
    );
  } else {
    res.clearCookie(stateKey);

    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_id_secret).toString('base64')
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        setAccessToken(body.access_token)
        const refresh_token = body.refresh_token;

        console.log(body.access_token);
        console.log(body.refresh_token);

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + body.access_token },
          json: true
        };

        request.get(options, (error, response, body) => {
          user_id = body.id;
        });

        res.send(body);
      } else {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token'
            })
        );
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_id_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send({
        'access_token': access_token
      });
    }
  });
});


app.get('/playlist', (req, res) => {
  const options = {
    url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
  };

  request.get(options, (error, response, body) => {
    console.log(body);

    res.send(body);
  });
});

function setAccessToken(accessToken) {
  access_token = accessToken;
}

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
