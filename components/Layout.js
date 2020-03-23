import React from 'react';
import Header from './Header';

const Layout = props => {
  return (
    <div>
      <Header />
      <header className="masthead">
        <div className="container h-100">{props.children}</div>
      </header>
      <div className="container">
        <footer className="footer">&copy; 2020 - kimjeff49</footer>
      </div>
    </div>
  );
};

export default Layout;
