import React from 'react';
import Layout from '../components/Layout';

export default class IndexPage extends React.Component {
  constructor() {
    super();
    this.state = {
      auth_url: null,
      auth_state: null
    };
  }

  componentDidMount() {
    this.getAuthUrl();
    this.getAuthState();
  }

  getAuthUrl() {
    fetch('/api/v1/spotify/auth')
      .then(data => data.json())
      .then(data => this.setState({ auth_url: data.authUrl }));
  }

  getAuthState() {
    fetch('/api/v1/spotify/auth/state').then(data =>
      this.setState({ auth_state: data.status })
    );
  }

  renderLogin() {
    const { auth_url, auth_state } = this.state;
    if (auth_state == 200) {
      return (
        <div>
          <div className="row justify-content-center">
            <div className="jumbotron">
              <h1 className="display-4">You're logged in!</h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <a className="btn btn-outline-primary" href="/playlist">
              Click here to see your playlists!
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="row justify-content-center">
            <div className="jumbotron">
              <h1 className="display-4">Need new song recommendations?</h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <a className="btn btn-outline-primary" href={auth_url}>
              Click here!
            </a>
          </div>
        </div>
      );
    }
  }

  render() {
    return <Layout>{this.renderLogin()}</Layout>;
  }
}
