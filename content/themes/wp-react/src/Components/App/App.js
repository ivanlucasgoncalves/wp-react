import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Arquive from '../Arquive/Arquive';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Home from '../Home/Home';
import NotFound from '../NotFound/NotFound';
import Page from '../Page/Page';
import Single from '../Single/Single';
import Tags from '../Tags/Tags';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path={WPReactSettings.path} component={Home} />
      <Route exact path={WPReactSettings.path + 'page/:slug'} component={Page} />
      <Route exact path={WPReactSettings.path + 'blog'} component={Arquive} />
      <Route exact path={WPReactSettings.path + 'blog/:slug'} component={Single} />
      <Route exact path={WPReactSettings.path + 'tag/:slug'} component={Tags} />
      <Route path="*" component={NotFound} />
    </Switch>
    <Footer />
  </div>
);

export default App;