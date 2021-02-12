import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  logout, fetchTreatments, fetchDoctors, postAppointment,
} from '../actions/index';
import Error from '../components/Error';
import '../assets/stylesheets/appointment-form.css';
import Loading from '../components/Loading';

const AppointmentForm = props => {
  const {
    user, history,
    treatments, doctors,
  } = props;
  const dispatch = useDispatch();

  const [state, setState] = useState({
    date: '',
    time: '',
    treatmentID: treatments.item.id ? treatments.item.id : '',
    doctorID: '',
    submittedForm: false,
  });

  useEffect(() => {
    dispatch(fetchTreatments('/treatments'));
    dispatch(fetchDoctors('/doctors'));
  }, []);

  useEffect(() => {
    if (!user.loggedInStatus && !user.loading) {
      history.push('/login');
    }
  }, [user.loggedInStatus]);

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

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(postAppointment(state, 'appointments'));
    setState({
      ...state,
      submittedForm: true,
    });
  };

  if (user.error.length) {
    return <Error />;
  }

  if (state.submittedForm) {
    return <Redirect to="/appointments" />;
  }

  return (
    <div className="w-85">
      {
        treatments.loading || doctors.loading
          ? (
            <Loading />
          )
          : (
            <div className="d-flex f-dir-col w-100 show">
              <button type="button" onClick={handleLogout} className="logout-btn">Logout</button>
              <article className="d-flex align-i-c f-dir-col">
                <p className="form-title">Make Your Appointment</p>
                <form onSubmit={handleSubmit} className="appoint-form d-flex f-dir-col align-i-c">
                  <select
                    name="treatmentID"
                    className="select"
                    value={treatments.item.id}
                    onChange={handleChange}
                    required
                  >
                    <option key="none" value="">Treatments</option>
                    {
                      treatments.list.map(treatment => (
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
                      doctors.list.map(doctor => (
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
              </article>
            </div>
          )
      }
    </div>
  );
};

AppointmentForm.propTypes = {
  user: PropTypes.shape({
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    loggedInStatus: PropTypes.bool.isRequired,
  }).isRequired,
  treatments: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    item: PropTypes.shape().isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  doctors: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = state => {
  const {
    user, treatments, doctors,
  } = state;

  return {
    user, treatments, doctors,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentForm);
