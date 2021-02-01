import axios from 'axios';
import urlApi from './urlApi';

export const postAppointmentApi = async (state, opt = '') => {
  const datetime = `${state.date} ${state.time}`;
  const response = await axios.post(`${urlApi}${opt}`, {
    appointment: {
      date: datetime,
      completed: true,
      doctor_id: state.doctorID,
      treatment_id: state.treatmentID,
    },
  },
  { withCredentials: true });

  return response.data;
};

export const getAppointmentListApi = async (opt = '') => {
  const response = await axios.get(`${urlApi}${opt}`, { withCredentials: true });

  return response.data;
};
