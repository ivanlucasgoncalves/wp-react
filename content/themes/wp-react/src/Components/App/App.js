import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Page from '../Page/Page';
import Arquive from '../Arquive/Arquive';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
            <Route exact path={WPReactSettings.path + 'pages'} component={Page} />
            <Route exact path={WPReactSettings.path + 'blog'} component={Arquive} />
        </Switch>
        <Footer />
      </div>
    );
  }
}