import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { checkSession, logout, fetchAppointments } from '../actions/index';
import Error from '../components/Error';

const AppointmentList = props => {
  const {
    error, loggedInStatus, list, loading,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession('logged_in'));
    dispatch(fetchAppointments('appointments'));
  }, []);

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
      {
      loading
        ? <h3>Loading</h3>
        : (
          <>
            <button type="button" onClick={handleLogout}>Logout</button>
            <div>
              Appointments
              {
                list.map(appointment => (
                  <div key={appointment.id}>
                    <h2>{`Appointment No: ${appointment.id}`}</h2>
                    <p>{`Date: ${new Date(appointment.date).toGMTString()}`}</p>
                    <p>{`Completed: ${appointment.completed}`}</p>
                    <p>{`Doctor: ${appointment.doctor.name}`}</p>
                    <p>{`Treatment: ${appointment.treatment.name}`}</p>
                    <p>{`Price: ${appointment.treatment.price} USD`}</p>
                    <p>{`Description: ${appointment.treatment.desc}`}</p>
                  </div>
                ))
              }
            </div>
          </>
        )
      }
    </>
  );
};

AppointmentList.propTypes = {
  error: PropTypes.string.isRequired,
  loggedInStatus: PropTypes.bool.isRequired,
  list: PropTypes.shape().isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const { user, appointments } = state;
  const { error, loggedInStatus } = user;
  const { list, loading } = appointments;

  return {
    error, loggedInStatus, list, loading,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentList);
