import React from 'react';
import Layout from '../components/Layout';
import { chunk } from 'lodash';

export default class Playlist extends React.Component {
  constructor() {
    super();
    this.state = {
      playlists: []
    };
  }

  componentDidMount() {
    this.getPlaylists();
  }

  getPlaylists() {
    fetch('/api/v1/spotify/playlists')
      .then(data => data.json())
      .then(data =>
        this.setState({
          playlists: data.items
        })
      );
  }

  renderPlaylists() {
    const { playlists } = this.state;
    const sections = chunk(playlists, 3);
    return (
      <div>
        {sections.map((divs, idx) => (
          <div className="row mb-3 mt-3" key={idx}>
            {divs.map((playlist, idx) => (
              <div className="col-md-4" key={idx}>
                <a
                  href={'/api/v1/spotify/playlists/' + playlist.id}
                  className="list-group-item list-group-item-action"
                  key={idx}
                >
                  {playlist.name}
                </a>
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
                Below should be your playlists!
              </h1>
            </div>
          </div>
          {this.renderPlaylists()}
        </div>
      </Layout>
    );
  }
}
