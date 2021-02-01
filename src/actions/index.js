import {
  FETCH_REQUEST, FETCH_FAILURE,
  POST_APPOINTMENT_SUCCESS, FETCH_APPOINTMENTS_SUCCESS, FETCH_APPOINTMENT_SUCCESS, SUBMITFORM_RESET,
  FETCH_TREATMENTS_SUCCESS, FETCH_TREATMENT_SUCCESS,
  FETCH_DOCTORS_SUCCESS, FETCH_DOCTOR_SUCCESS,
  POST_USER_SUCCESS, CHECK_SESSION_SUCCESS, LOGOUT_SUCCESS,
} from './types';
import {
  postUserApi, createSessionApi,
  checkSessionApi, logoutApi,
} from '../api/api';
import { getTreatmentListApi, getTreatmentApi } from '../api/treatment';
import getDoctorListApi from '../api/doctor';
import { postAppointmentApi, getAppointmentListApi } from '../api/appointment';

export const fetchRequest = () => ({
  type: FETCH_REQUEST,
});

export const fetchFailure = error => ({
  type: FETCH_FAILURE,
  payload: error,
});

export const submitFomReset = () => ({
  type: SUBMITFORM_RESET,
});

export const postAppointmentSuccess = appointments => ({
  type: POST_APPOINTMENT_SUCCESS,
  payload: appointments,
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

export const postAppointment = (state, opt) => (
  dispatch => {
    dispatch(fetchRequest());
    return postAppointmentApi(state, opt)
      .then(response => {
        const appointment = response;
        return dispatch(postAppointmentSuccess(appointment));
      })
      .catch(error => dispatch(fetchFailure(error.message)));
  }
);

export const fetchAppointments = opt => (
  dispatch => {
    dispatch(fetchRequest());
    return getAppointmentListApi(opt)
      .then(response => {
        const appointments = response;
        return dispatch(fetchAppointmentsSuccess(appointments));
      })
      .catch(error => dispatch(fetchFailure(error.message)));
  }
);

export const fetchTreatments = opt => (
  dispatch => {
    dispatch(fetchRequest());
    return getTreatmentListApi(opt)
      .then(response => {
        const treatments = response;
        return dispatch(fetchTreatmentsSuccess(treatments));
      })
      .catch(error => dispatch(fetchFailure(error.message)));
  }
);

export const fetchTreatment = (opt, id) => (
  dispatch => {
    dispatch(fetchRequest());
    return getTreatmentApi(opt, id)
      .then(response => {
        const treatment = response;
        return dispatch(fetchTreatmentSuccess(treatment));
      })
      .catch(error => dispatch(fetchFailure(error.message)));
  }
);

export const fetchDoctors = opt => (
  dispatch => {
    dispatch(fetchRequest());
    return getDoctorListApi(opt)
      .then(response => {
        const doctors = response;
        return dispatch(fetchDoctorsSuccess(doctors));
      })
      .catch(error => dispatch(fetchFailure(error.message)));
  }
);

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
