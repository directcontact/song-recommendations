const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const cryptoRandomString = require('crypto-random-string');
const session = require('express-session');
const path = require('path');
const recommendAlgorithm = require('./util/recommendAlgorithm');
require('dotenv').config();

const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-modify-public',
  'playlist-modify-private'
];

const state = cryptoRandomString({ length: 10, type: 'base64' });
const session_secret = cryptoRandomString({ length: 10, type: 'base64' });

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_ID_SECRET,
  redirectUri: process.env.CALLBACK_URL
});
const app = express();

app
  .use(cors())
  .use(bodyParser.json())
  .use(cookieParser())
  .use(session({ secret: session_secret }))
  .use(
    express.static(path.join(__dirname, './public'), {
      extensions: ['html']
    })
  )
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.options('*', cors());

app.get('/api/v1/spotify/auth', cors(), (req, res) => {
  authUrl = spotifyApi.createAuthorizeURL(scopes, state);
  res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
  const { code } = req.query;
  const data = await spotifyApi.authorizationCodeGrant(code);
  const { access_token, refresh_token } = data.body;
  spotifyApi.setAccessToken(access_token);
  spotifyApi.setRefreshToken(refresh_token);
  res.redirect('http://localhost:3000/playlists');
});

app.get('/api/v1/spotify/playlists', async (req, res) => {
  const data = await spotifyApi.getUserPlaylists();
  res.send(data.body);
});

app.get('/api/v1/spotify/playlists/:playlistId', async (req, res) => {
  const id = req.params.playlistId;
  const data = await spotifyApi.getPlaylistTracks(id);
  const tracks = data.body.items.map(item => item.track);
  req.session.tracks = tracks;
  res.redirect('/recommendations');
});

app.get('/api/v1/spotify/recommend', async (req, res) => {
  const tracks = req.session.tracks;
  const ids = tracks.map(track => track.id);
  const features = await spotifyApi.getAudioFeaturesForTracks(ids);
  const recommendation = recommendAlgorithm(features.body.audio_features, ids);
  const songs = await spotifyApi.getRecommendations({
    seed_tracks: recommendation.seed_tracks,
    target_danceability: recommendation.danceability,
    target_energy: recommendation.energy,
    target_loudness: recommendation.loudness,
    target_mode: recommendation.mode,
    target_speechiness: recommendation.spechiness,
    target_acousticness: recommendation.acousticness,
    target_instrumentalness: recommendation.instrumentalness,
    target_liveness: recommendation.liveness,
    target_valence: recommendation.valence,
    target_popularity: recommendation.popularity
  });
  res.send(songs);
});

app.get('/api/v1/spotify/token', async (req, res) => {
  const data = await spotifyApi.refreshAccessToken();
  const { refresh_token } = data.body;
  spotifyApi.setRefreshToken(refresh_token);
  res.send(200);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});
