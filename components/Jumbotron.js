import React from 'react';

const Jumbotron = (props) => {
  return (
    <div className="h-100 d-flex flex-column justify-content-center">
      <div className="row justify-content-center">
        <div className="jumbotron">
          <h1 className="display-4">{props.headerText}</h1>
        </div>
      </div>
      <div className="row justify-content-center">{props.children}</div>
    </div>
  );
};

export default Jumbotron;
