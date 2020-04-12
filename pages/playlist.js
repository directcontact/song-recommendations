import React from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Jumbotron from '../components/Jumbotron';
import { chunk } from 'lodash';
import Router from 'next/router';

export default class Playlist extends React.Component {
  constructor() {
    super();
    this.state = {
      playlists: [],
    };
  }

  componentDidMount() {
    this.getPlaylists();
  }

  getPlaylists() {
    fetch('/api/v1/spotify/playlists')
      .then((data) => {
        if (data.status === 401) {
          Router.push('/');
        }
        return data.json();
      })
      .then((data) =>
        this.setState({
          playlists: data.items,
        })
      )
      .catch((err) => console.log(err.stack));
  }

  renderPlaylists() {
    const { playlists } = this.state;
    const sections = chunk(playlists, 3);
    return (
      <div>
        {sections.map((divs, idx) => (
          <div className="row mb-3 mt-3" key={idx}>
            {divs.map((playlist, idx) => (
              <div className="col-md-4 text-center" key={idx}>
                <Card>
                  <a
                    href={'/api/v1/spotify/playlists/' + playlist.id}
                    className="list-group-item list-group-item-action"
                    key={idx}
                  >
                    <h6>{playlist.name}</h6>
                  </a>
                </Card>
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
        <Jumbotron headerText="Below should be your playlists!" />
        <div className="row justify-content-center">
          {this.renderPlaylists()}
        </div>
      </Layout>
    );
  }
}
