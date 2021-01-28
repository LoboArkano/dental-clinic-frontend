import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../actions/index';
import Error from '../components/Error';

const TreatmentList = props => {
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
        Hello from TreatmentList
      </div>
    </>
  );
};

TreatmentList.propTypes = {
  error: PropTypes.string.isRequired,
  loggedInStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const { user } = state;
  const { error, loggedInStatus } = user;

  return { error, loggedInStatus };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TreatmentList);
