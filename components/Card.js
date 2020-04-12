import React from 'react';

const Card = props => {
  return (
    <div className="card-group">
      <div className="card">{props.children}</div>
    </div>
  );
};

export default Card;
