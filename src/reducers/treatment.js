import {
  FETCH_REQUEST, FETCH_FAILURE,
  FETCH_TREATMENTS_SUCCESS, FETCH_TREATMENT_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  list: [],
  item: {},
};

const treatmentReducer = (state = INITIAL_STATE, action) => {
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
    case FETCH_TREATMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
        error: '',
      };
    case FETCH_TREATMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload.treatment,
        error: '',
      };
    default:
      return state;
  }
};

export default treatmentReducer;
