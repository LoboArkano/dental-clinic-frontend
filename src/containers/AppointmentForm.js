import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  logout, checkSession, fetchTreatments, fetchDoctors, postAppointment,
} from '../actions/index';
import Error from '../components/Error';

const AppointmentForm = props => {
  const {
    error, loggedInStatus, treatments, doctors,
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

  const handleLogout = useCallback(() => {
    dispatch(logout('logout'));
  });

  const handleChange = useCallback(e => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }, [state]);

  const handleSubmit = useCallback(() => {
    dispatch(postAppointment(state, 'appointments'))
      .then(() => {
        console.log('redirect');
        return <Redirect to="/" />;
      });
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
        treatments.loading || doctors.loading
          ? <h3>Loading</h3>
          : (
            <>
              <button type="button" onClick={handleLogout}>Logout</button>
              <div>
                <p>Complete the form</p>
                <form onSubmit={handleSubmit}>
                  <div>
                    <select
                      name="treatmentID"
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
                    <input type="date" name="date" onChange={handleChange} value={state.date} required />
                    <input type="time" name="time" onChange={handleChange} value={state.time} required />
                    <button type="submit">Submit</button>
                  </div>
                </form>
              </div>
            </>
          )
      }
    </>
  );
};

AppointmentForm.propTypes = {
  error: PropTypes.string.isRequired,
  loggedInStatus: PropTypes.bool.isRequired,
  treatments: PropTypes.shape().isRequired,
  doctors: PropTypes.shape().isRequired,
};

const mapStateToProps = state => {
  const { user, treatments, doctors } = state;
  const { error, loggedInStatus } = user;

  return {
    error, loggedInStatus, treatments, doctors,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentForm);
