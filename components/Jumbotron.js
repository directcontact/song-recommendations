import React from 'react';
import Link from 'next/link';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

const Jumbotron = props => {
  return (
    <div className="h-100 d-flex flex-column justify-content-center">
      <div className="row justify-content-center">
        <div className="jumbotron">
          <h1 className="display-4">{props.headerText}</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <a className="btn btn-outline-primary" href={props.url}>
          {props.buttonText}
        </a>
      </div>
    </div>
  );
};

export default Jumbotron;
