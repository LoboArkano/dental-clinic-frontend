import {
  FETCH_REQUEST, FETCH_FAILURE,
  FETCH_APPOINTMENTS_SUCCESS, FETCH_APPOINTMENT_SUCCESS,
  FETCH_TREATMENTS_SUCCESS, FETCH_TREATMENT_SUCCESS,
  FETCH_DOCTORS_SUCCESS, FETCH_DOCTOR_SUCCESS,
} from './types';

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
