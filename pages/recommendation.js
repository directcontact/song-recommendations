import React from 'react';
import Layout from '../components/Layout';
import { chunk } from 'lodash';
import SpotifyPlayer from 'react-spotify-player';

export default class Recommendation extends React.Component {
  constructor() {
    super();
    this.state = {
      tracks: []
    };
  }

  componentDidMount() {
    this.getRecommendations();
  }

  getRecommendations() {
    fetch('/api/v1/spotify/recommend')
      .then(data => data.json())
      .then(data => this.setState({ tracks: data.body.tracks }));
  }

  renderRecommendations() {
    const { tracks } = this.state;
    const sections = chunk(tracks, 3);
    return (
      <div>
        {sections.map((divs, idx) => (
          <div className="row mb-3 mt-3" key={idx}>
            {divs.map((track, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card-group">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        {track.artists.map(artist => artist.name).join(', ')}
                      </h5>
                      <div className="card-text">
                        <a className="list-group-item" key={idx}>
                          {track.name}
                        </a>
                      </div>
                      <div className="card-footer">
                        <SpotifyPlayer
                          uri={track.external_urls.spotify}
                          size={{ width: '100%', height: 80 }}
                          view="coverart"
                          theme="black"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <Layout>
        <div>
          <div className="row justify-content-center">
            <div className="jumbotron">
              <h1 className="display-4 text-center">
                Below should be your recommended songs!
              </h1>
            </div>
          </div>
          {this.renderRecommendations()}
        </div>
      </Layout>
    );
  }
}
