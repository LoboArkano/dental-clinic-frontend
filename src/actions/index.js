import {
  FETCH_REQUEST, FETCH_FAILURE,
  FETCH_APPOINTMENTS_SUCCESS, FETCH_APPOINTMENT_SUCCESS,
  FETCH_TREATMENTS_SUCCESS, FETCH_TREATMENT_SUCCESS,
  FETCH_DOCTORS_SUCCESS, FETCH_DOCTOR_SUCCESS,
  POST_USER_SUCCESS, CHECK_SESSION_SUCCESS, LOGOUT_SUCCESS,
} from './types';
import {
  postUserApi, createSessionApi,
  checkSessionApi, logoutApi,
} from '../api/api';

export const fetchRequest = () => ({
  type: FETCH_REQUEST,
});

export const fetchFailure = error => ({
  type: FETCH_FAILURE,
  payload: error,
});

export const fetchAppointmentsSuccess = appointments => ({
  type: FETCH_APPOINTMENTS_SUCCESS,
  payload: appointments,
});

export const fetchAppointmentSuccess = appointment => ({
  type: FETCH_APPOINTMENT_SUCCESS,
  payload: appointment,
});

export const fetchTreatmentsSuccess = treatments => ({
  type: FETCH_TREATMENTS_SUCCESS,
  payload: treatments,
});

export const fetchTreatmentSuccess = treatment => ({
  type: FETCH_TREATMENT_SUCCESS,
  payload: treatment,
});

export const fetchDoctorsSuccess = doctors => ({
  type: FETCH_DOCTORS_SUCCESS,
  payload: doctors,
});

export const fetchDoctorSuccess = doctor => ({
  type: FETCH_DOCTOR_SUCCESS,
  payload: doctor,
});

export const postUserSuccess = user => ({
  type: POST_USER_SUCCESS,
  payload: user,
});

export const checkSessionSuccess = user => ({
  type: CHECK_SESSION_SUCCESS,
  payload: user,
});

export const logoutSuccess = status => ({
  type: LOGOUT_SUCCESS,
  payload: status,
});

export const postUser = (state, opt) => (
  dispatch => {
    dispatch(fetchRequest());
    return postUserApi(state, opt)
      .then(response => {
        const user = response;
        return dispatch(postUserSuccess(user));
      })
      .catch(error => dispatch(fetchFailure(error.message)));
  }
);

export const createSession = (state, opt) => (
  dispatch => {
    dispatch(fetchRequest());
    return createSessionApi(state, opt)
      .then(response => {
        const user = response;
        return dispatch(postUserSuccess(user));
      })
      .catch(error => dispatch(fetchFailure(error.message)));
  }
);

export const checkSession = opt => (
  dispatch => {
    dispatch(fetchRequest());
    return checkSessionApi(opt)
      .then(response => {
        const user = response;
        return dispatch(checkSessionSuccess(user));
      })
      .catch(error => dispatch(fetchFailure(error.message)));
  }
);

export const logout = opt => (
  dispatch => {
    dispatch(fetchRequest());
    return logoutApi(opt)
      .then(response => {
        const status = response;
        return dispatch(logoutSuccess(status));
      })
      .catch(error => dispatch(fetchFailure(error.message)));
  }
);
