import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';

import App from './Components/App/App';

// Routes
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>
);

ReactDOM.render((routes), document.getElementById('app'));