import React from 'react';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Jumbotron from '../components/Jumbotron';
import Router from 'next/router';
import cryptoRandomString from 'crypto-random-string';

export default class IndexPage extends React.Component {
  constructor() {
    super();
    this.state = {
      auth_url: null,
      access_token: '',
      refresh_token: ''
    };
  }

  componentDidMount() {
    this.getAuthUrl();
  }

  getAuthUrl() {
    const client_id = process.env.CLIENT_ID;
    const base_url =
      process.env.NODE_ENV !== 'production'
        ? process.env.BASE_URL_DEV
        : process.env.BASE_URL_PROD;
    const encoded_url = encodeURIComponent(
      `${base_url}/${process.env.CALLBACK}`
    );
    const callback = process.env.CALLBACK;
    const scope =
      'user-read-private user-read-email playlist-modify-public playlist-modify-private';
    const state = cryptoRandomString({ length: 10, type: 'base64' });
    this.setState({
      auth_url: `https://accounts.spotify.com/authorize/?client_id=${client_id}&response_type=token&redirect_uri=${encoded_url}&scope=${encodeURIComponent(
        scope
      )}&state=${state}`
    });
  }

  renderLogin() {
    const { auth_url, access_token, refresh_token } = this.state;
    console.log(auth_url);
    if (access_token && refresh_token) {
      return (
        <Jumbotron
          url="/playlist"
          buttonText="Click here to see your playlists!"
          headerText="You're logged in!"
        />
      );
    } else {
      return (
        <Jumbotron
          url={auth_url}
          buttonText="Click here!"
          headerText="Need new song recommendations?"
        />
      );
    }
  }

  render() {
    return <Layout>{this.renderLogin()}</Layout>;
  }
}
