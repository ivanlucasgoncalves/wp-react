import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <ul className="cntr">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/page/sample-page">Sample Page</Link></li>
      <li><Link to="/blog">Blog</Link></li>
    </ul>
  </header>
);

export default Header;