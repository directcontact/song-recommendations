const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const cryptoRandomString = require('crypto-random-string');
require('dotenv').config();

const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-modify-public',
  'playlist-modify-private'
];

const state = cryptoRandomString({ length: 10, type: 'base64' });

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_ID_SECRET,
  redirectUri: process.env.CALLBACK_URL
});

router.get('/', (req, res) => {
  console.log('Request for home receieved');
  res.render('index.html');
});

router.get('/login', (req, res) => {
  const auth = spotifyApi.createAuthorizeURL(scopes, state);
  try {
    res.redirect(auth);
  } catch (e) {
    console.log(e);
  }
});

router.get('/callback', (req, res) => {
  console.log('helko');
  const { code } = req.query;
  spotifyApi.authorizationCodeGrant(code).then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
  });

  res.redirect('http://localhost:8080/');
});

router.get('/refresh', (req, res) => {
  spotifyApi.refreshAccessToken().then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  });
});

router.get('/playlists', (req, res) => {
  console.log('Request for playlists received');
  spotifyApi.getUserPlaylists().then(data => {
    let playlists = data.body.items.map(item => item.name);
    console.log(playlists);
    res.send({ playlists });
  });
});

module.exports = router;
