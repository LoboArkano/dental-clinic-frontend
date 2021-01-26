import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Error from './Error';

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" component={Main} exact />
      <Route component={Error} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
