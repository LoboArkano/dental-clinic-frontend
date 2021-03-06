import {
  FETCH_REQUEST, FETCH_FAILURE,
  POST_APPOINTMENT_SUCCESS, FETCH_APPOINTMENTS_SUCCESS, FETCH_APPOINTMENT_SUCCESS,
  SUBMITFORM_RESET,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  list: [],
  item: {},
  submitForm: false,
};

const appointmentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload.appointment,
        error: action.payload,
        submitForm: true,
      };
    case FETCH_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
        error: '',
      };
    case FETCH_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload,
        error: '',
      };
    case SUBMITFORM_RESET:
      return {
        ...state,
        submitForm: false,
      };
    default:
      return state;
  }
};

export default appointmentReducer;
