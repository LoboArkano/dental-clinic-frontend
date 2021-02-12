import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { logout, fetchAppointments } from '../actions/index';
import Error from '../components/Error';
import '../assets/stylesheets/appointment-list.css';
import Loading from '../components/Loading';

const AppointmentList = props => {
  const {
    user, history,
    list, loading,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAppointments('appointments'));
  }, []);

  useEffect(() => {
    if (!user.loggedInStatus && !user.loading) {
      history.push('/login');
    }
  }, [user.loggedInStatus]);

  const handleLogout = useCallback(() => {
    dispatch(logout('logout'));
  });

  if (user.error.length) {
    return <Error />;
  }

  return (
    <main className="w-85 vh-100">
      {
      loading
        ? (
          <Loading />
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
  user: PropTypes.shape({
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    loggedInStatus: PropTypes.bool.isRequired,
  }).isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    doctor: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    treatment: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      desc: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = state => {
  const { user, appointments } = state;
  const { list, loading } = appointments;

  return {
    user, list, loading,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentList);
