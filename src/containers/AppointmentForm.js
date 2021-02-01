import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  logout, checkSession, fetchTreatments, fetchDoctors, postAppointment, submitFomReset,
} from '../actions/index';
import AppointmentList from './AppointmentList';
import Error from '../components/Error';
import '../assets/stylesheets/appointment-form.css';

const AppointmentForm = props => {
  const {
    error, loggedInStatus, treatments, doctors, appointments,
  } = props;
  const dispatch = useDispatch();

  const [state, setState] = useState({
    date: '',
    time: '',
    treatmentID: '',
    doctorID: '',
  });

  useEffect(() => {
    dispatch(checkSession('logged_in'));
    dispatch(fetchTreatments('/treatments'));
    dispatch(fetchDoctors('/doctors'));
  }, []);

  const handleLogout = useCallback(e => {
    dispatch(logout('logout'));
    e.preventDefault();
  });

  const handleChange = useCallback(e => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }, [state]);

  const handleSubmit = useCallback(() => {
    dispatch(postAppointment(state, 'appointments'));
    return <AppointmentList />;
  });

  if (error.length) {
    return <Error />;
  }

  if (!loggedInStatus) {
    return <Redirect to="/login" />;
  }

  if (appointments.submitForm) {
    dispatch(submitFomReset());
    return <Redirect to="/appointments" />;
  }

  return (
    <div className="w-85">
      {
        treatments.loading || doctors.loading
          ? <></>
          : (
            <div className="d-flex f-dir-col w-100 show">
              <button type="button" onClick={handleLogout} className="logout-btn">Logout</button>
              <div className="d-flex align-i-c f-dir-col">
                <p className="form-title">Make Your Appointment</p>
                <form onSubmit={handleSubmit} className="appoint-form d-flex f-dir-col align-i-c">
                  <select
                    name="treatmentID"
                    className="select"
                    onChange={handleChange}
                    required
                  >
                    <option key="none" value="">Treatments</option>
                    {
                      treatments.list.treatments.map(treatment => (
                        <option
                          key={treatment.id}
                          value={treatment.id}
                        >
                          { treatment.name }
                        </option>
                      ))
                    }
                  </select>
                  <select
                    name="doctorID"
                    className="select"
                    onChange={handleChange}
                    required
                  >
                    <option key="none" value="">Doctors</option>
                    {
                      doctors.list.doctors.map(doctor => (
                        <option
                          key={doctor.id}
                          value={doctor.id}
                        >
                          { doctor.name }
                        </option>
                      ))
                    }
                  </select>
                  <div className="datetime d-flex justify-cont-sa">
                    <label htmlFor="date">
                      Date:
                      <input type="date" name="date" className="datetime-input" onChange={handleChange} value={state.date} required />
                    </label>
                    <label htmlFor="time">
                      Time:
                      <input type="time" name="time" className="datetime-input" onChange={handleChange} value={state.time} required />
                    </label>
                  </div>
                  <button type="submit" className="submit-btn">Submit</button>
                </form>
              </div>
            </div>
          )
      }
    </div>
  );
};

AppointmentForm.propTypes = {
  error: PropTypes.string.isRequired,
  loggedInStatus: PropTypes.bool.isRequired,
  treatments: PropTypes.shape().isRequired,
  doctors: PropTypes.shape().isRequired,
  appointments: PropTypes.shape().isRequired,
};

const mapStateToProps = state => {
  const {
    user, treatments, doctors, appointments,
  } = state;
  const { error, loggedInStatus } = user;

  return {
    error, loggedInStatus, treatments, doctors, appointments,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentForm);
