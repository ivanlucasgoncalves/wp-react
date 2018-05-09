import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Arquive from '../Arquive/Arquive';
import Page from '../Page/Page';
import Single from '../Single/Single';
import NotFound from '../NotFound/NotFound';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path={WPReactSettings.path} component={Home} />
          <Route exact path={WPReactSettings.path + 'page/:slug'} component={Page} />
          <Route exact path={WPReactSettings.path + 'blog'} component={Arquive} />
          <Route exact path={WPReactSettings.path + 'blog/:slug'} component={Single} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}