import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Login from '../containers/Login';
import Registration from '../containers/Registration';
import CTreatmentList from '../containers/TreatmentList';
import CTreatment from '../containers/Treatment';
import CAppointmentList from '../containers/AppointmentList';
import Error from './Error';

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/sign-up" component={Registration} exact />
      <Route path="/treatments" component={CTreatmentList} exact />
      <Route path="/treatment/:id" component={CTreatment} exact />
      <Route path="/appointments" component={CAppointmentList} exact />
      <Route component={Error} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
