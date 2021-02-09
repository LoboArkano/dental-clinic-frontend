import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { checkSession } from '../actions/index';
import Header from './Header';
import Main from './Main';
import Login from '../containers/Login';
import Registration from '../containers/Registration';
import CTreatmentList from '../containers/TreatmentList';
import CTreatment from '../containers/Treatment';
import CAppointmentList from '../containers/AppointmentList';
import AppointmentForm from '../containers/AppointmentForm';
import Error from './Error';

const Routes = () => {
  const dispatch = useDispatch();
  dispatch(checkSession('logged_in'));

  return (
    <BrowserRouter>
      <div className="d-flex w-100 vh-100">
        <Header />
        <Switch>
          <Route path="/" component={Main} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/sign-up" component={Registration} exact />
          <Route path="/treatments" component={CTreatmentList} exact />
          <Route path="/treatment/:id" component={CTreatment} exact />
          <Route path="/appointments" component={CAppointmentList} exact />
          <Route path="/appointment-form" component={AppointmentForm} exact />
          <Route component={Error} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(Routes);
