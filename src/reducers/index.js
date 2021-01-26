import { combineReducers } from 'redux';
import appointmentReducer from './appointment';
import doctorReducer from './doctor';
import treatmentReducer from './treatment';

const rootReducer = combineReducers({
  appointments: appointmentReducer,
  doctors: doctorReducer,
  treatments: treatmentReducer,
});

export default rootReducer;
