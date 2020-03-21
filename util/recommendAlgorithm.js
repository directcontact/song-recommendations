const recommendAlgorithm = (features, ids) => {
  let recommendation = {
    seed_tracks: [],
    danceability: 0,
    energy: 0,
    loudness: 0,
    mode: 0,
    speechiness: 0,
    acousticness: 0,
    instrumentalness: 0,
    liveness: 0,
    valence: 0,
    popularity: 0
  };
  features.map(feature => {
    recommendation.danceability += feature.danceability;
    recommendation.energy += feature.energy;
    recommendation.loudness += feature.loudness;
    recommendation.mode += feature.mode;
    recommendation.speechiness += feature.speechiness;
    recommendation.acousticness += feature.acousticness;
    recommendation.instrumentalness += feature.instrumentalness;
    recommendation.liveness += feature.liveness;
    recommendation.valence += feature.valence;
  });

  recommendation.danceability /= features.length;
  recommendation.energy /= features.length;
  recommendation.loudness /= features.length;
  recommendation.mode = Math.round(recommendation.mode / features.length);
  recommendation.speechiness /= features.length;
  recommendation.acousticness /= features.length;
  recommendation.instrumentalness /= features.length;
  recommendation.liveness /= features.length;
  recommendation.valence /= features.length;

  while (recommendation.seed_tracks.length < 5) {
    const track = ids[Math.floor(Math.random() * ids.length)];
    if (!recommendation.seed_tracks.includes(track)) {
      recommendation.seed_tracks.push(track);
    }
  }

  return recommendation;
};

module.exports = recommendAlgorithm;
