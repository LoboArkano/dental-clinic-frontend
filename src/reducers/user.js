import {
  FETCH_REQUEST, FETCH_FAILURE,
  POST_USER_SUCCESS, CHECK_SESSION_SUCCESS, LOGOUT_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  loggedInStatus: false,
  data: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
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
    case POST_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedInStatus: action.payload.logged_in,
        data: action.payload.user,
        error: '',
      };
    case CHECK_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedInStatus: action.payload.logged_in,
        data: {} || action.payload.user,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedInStatus: action.payload.logged_in,
        data: {},
      };
    default:
      return state;
  }
};

export default userReducer;
