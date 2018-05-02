import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render(){
    return(
      <div>
        <p className="title">Header</p>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pages">Pages</Link>
          </li>
        </ul>
      </div>
    );
  }
}