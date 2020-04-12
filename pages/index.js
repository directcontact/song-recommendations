import React from 'react';
import Layout from '../components/Layout';
import Jumbotron from '../components/Jumbotron';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

export default class IndexPage extends React.Component {
  constructor() {
    super();
    this.state = {
      auth_url: '',
      auth_state: '',
    };
  }

  componentDidMount() {
    this.getAuthUrl();
    this.getAuthState();
  }

  getAuthUrl() {
    fetch('/api/v1/spotify/auth')
      .then((data) => data.json())
      .then((data) => this.setState({ auth_url: data.authUrl }));
  }

  getAuthState() {
    fetch('/api/v1/spotify/auth/state')
      .then((data) => data.json())
      .then((data) => this.setState({ auth_state: data.state }));
  }

  renderLogin() {
    const { auth_url, auth_state } = this.state;
    if (auth_state) {
      return (
        <Jumbotron headerText="You're logged in!">
          <Link href="/playlist">
            <a className="btn btn-outline-primary" href={auth_url}>
              Click here to see your playlists!
            </a>
          </Link>
        </Jumbotron>
      );
    } else {
      return (
        <Jumbotron headerText="Need new song recommendations?">
          <a className="btn btn-outline-primary" href={auth_url}>
            Click here to login!
          </a>
        </Jumbotron>
      );
    }
  }

  render() {
    return <Layout>{this.renderLogin()}</Layout>;
  }
}
