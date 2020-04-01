import Router from 'next/router';
import React from 'react';

export default class Callback extends React.Component {
  componentDidMount() {
    console.log(document.location.href);
  }

  render() {
    return <div></div>;
  }
}
