import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { checkSession, logout, fetchAppointments } from '../actions/index';
import Error from '../components/Error';
import '../assets/stylesheets/appointment-list.css';
import loadingImg from '../assets/images/loading.png';

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
    <main className="w-85 vh-100">
      {
      loading
        ? (
          <div className="loading d-flex w-100">
            <img className="loading-img" src={loadingImg} alt="" />
          </div>
        )
        : (
          <div className="d-flex f-dir-col w-100 h-100 show">
            <button type="button" onClick={handleLogout} className="logout-btn">Logout</button>
            <section className="appoint-list d-flex f-wrap w-100">
              {
                list.map(appointment => (
                  <article key={appointment.id} className="appoint-card">
                    <h2 className="appoint-no">{`Appointment No: ${appointment.id}`}</h2>
                    <p className="">{`Date: ${new Date(appointment.date).toGMTString()}`}</p>
                    <p className="">{`Status: ${appointment.completed ? 'Completed' : 'Pending'}`}</p>
                    <p className="">{`Doctor: ${appointment.doctor.name}`}</p>
                    <p className="">{`Treatment: ${appointment.treatment.name}`}</p>
                    <p className="">{`Price: ${appointment.treatment.price} USD`}</p>
                    <p className="">{`Description: ${appointment.treatment.desc}`}</p>
                  </article>
                ))
              }
            </section>
          </div>
        )
      }
    </main>
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
