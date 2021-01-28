import { combineReducers } from 'redux';
import appointmentReducer from './appointment';
import doctorReducer from './doctor';
import treatmentReducer from './treatment';
import userReducer from './user';

const rootReducer = combineReducers({
  appointments: appointmentReducer,
  doctors: doctorReducer,
  treatments: treatmentReducer,
  user: userReducer,
});

export default rootReducer;
