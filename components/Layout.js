import React from 'react';
import Header from './Header';

const Layout = props => {
  return (
    <section className="spotify">
      <Header />
      <div className="spotify--container">
        <div className="container justify-content-center">{props.children}</div>
      </div>
    </section>
  );
};

export default Layout;
