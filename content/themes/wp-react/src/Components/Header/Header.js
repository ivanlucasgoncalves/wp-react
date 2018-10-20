import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <div className="cntr">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/page/sample-page">Sample Page</Link></li>
        <li><Link to="/blog">Blog</Link></li>
      </ul>
    </div>
  </header>
);

export default Header;