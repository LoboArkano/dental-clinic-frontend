import {
  FETCH_REQUEST, FETCH_FAILURE,
  FETCH_DOCTORS_SUCCESS, FETCH_DOCTOR_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  list: [],
  item: {},
};

const doctorReducer = (state = INITIAL_STATE, action) => {
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
    case FETCH_DOCTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.doctors,
        error: '',
      };
    case FETCH_DOCTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload,
        error: '',
      };
    default:
      return state;
  }
};

export default doctorReducer;
