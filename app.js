const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const cryptoRandomString = require('crypto-random-string');
const session = require('express-session');
const next = require('next');
const recommendAlgorithm = require('./util/recommendAlgorithm');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();

const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-modify-public',
  'playlist-modify-private'
];

const state = cryptoRandomString({ length: 10, type: 'base64' });
const session_secret = cryptoRandomString({ length: 10, type: 'base64' });
const client_id = process.env.CLIENT_ID;
const client_secret_id = process.env.CLIENT_ID_SECRET;
const env = process.env.NODE_ENV;
const base_url =
  env !== 'production' ? process.env.BASE_URL_DEV : process.env.BASE_URL_PROD;
const callback = process.env.CALLBACK;
const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret_id,
  redirectUri: `${base_url}/${callback}`
});
const dev = env !== 'production';
const server = next({ dev });
const handle = server.getRequestHandler();

server
  .prepare()
  .then(() => {
    //    mongoose.connect(
    //      `mongodb+srv://${process.env.MONGO_ATLAS_ID}:${process.env.MONGO_ATLAS_PW}@song-recommendations-rfw0m.mongodb.net/test?retryWrites=true&w=majority`
    //    );

    const app = express();

    const refreshToken = async () => {
      const data = await spotifyApi.refreshAccessToken();
      const response = data.statusCode;
      const { refresh_token } = data.body;
      spotifyApi.setRefreshToken(refresh_token);
      return response;
    };

    app
      .use(helmet())
      .use(cors())
      .use(bodyParser.json())
      .use(cookieParser())
      .use(session({ secret: session_secret }))
      .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', `${base_url}/${callback}`);
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
      });

    app.options('*', cors());

    app.get('/api/v1/spotify/auth', (req, res) => {
      authUrl = spotifyApi.createAuthorizeURL(scopes, state);
      res.send({ authUrl });
    });

    app.get('/callback', async (req, res) => {
      const { code } = req.query;
      const data = await spotifyApi.authorizationCodeGrant(code);
      const { access_token, refresh_token } = data.body;
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      res.redirect(base_url);
    });

    app.get('/api/v1/spotify/auth/state', async (req, res) => {
      const access_token = spotifyApi.getAccessToken();
      res.send({ access_token });
    });

    app.get('/api/v1/spotify/playlists', async (req, res) => {
      const data = await spotifyApi.getUserPlaylists();
      if (data.statusCode === 401) {
        await refreshToken();
        data = await spotifyApi.getUserPlaylists();
      }

      data.statusCode === 200
        ? res.send(data.body).sendStatus(data.statusCode)
        : res.sendStatus(401);
    });

    app.get('/api/v1/spotify/playlists/:playlistId', async (req, res) => {
      const id = req.params.playlistId;
      const data = await spotifyApi.getPlaylistTracks(id);
      if (data.statusCode === 401) {
        await refreshToken();
        data = await spotifyApi.getPlaylistTracks(id);
      }
      const tracks = data.body.items.map(item => item.track);
      req.session.tracks = tracks;
      data.statusCode === 200
        ? res.redirect('/recommendation')
        : res.sendStatus(401);
    });

    app.get('/api/v1/spotify/recommend', async (req, res) => {
      const tracks = req.session.tracks;

      if (tracks === undefined) {
        return res.sendStatus(401);
      }

      const ids = tracks.map(track => track.id);
      const features = await spotifyApi.getAudioFeaturesForTracks(ids);

      if (features.statusCode === 401) {
        await refreshToken();
        features = await spotifyApi.getAudioFeaturesForTracks(ids);
      }
      const recommendation = recommendAlgorithm(
        features.body.audio_features,
        ids
      );
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

    app.get('*', (req, res) => {
      return handle(req, res);
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Listening on port ${process.env.PORT || 3000}!`);
    });
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
