import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { logout } from '../actions/index';
import Error from '../components/Error';

const AppointmentList = props => {
  const { error, loggedInStatus } = props;
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout('logout'));
  });

  if (error.length) {
    return <Error />;
  }

  if (!loggedInStatus) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <button type="button" onClick={handleLogout}>Logout</button>
      <div>
        Hello from AppointmentList
      </div>
    </>
  );
};

AppointmentList.propTypes = {
  error: PropTypes.string.isRequired,
  loggedInStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const { user } = state;
  const { error, loggedInStatus } = user;

  return { error, loggedInStatus };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentList);
