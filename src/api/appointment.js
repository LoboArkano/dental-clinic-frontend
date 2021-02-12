import axios from 'axios';
import urlApi from './urlApi';
import 'regenerator-runtime/runtime';

const config = { withCredentials: true, headers: { 'Access-Control-Allow-Origin': '*' } };

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
  config);

  return response.data;
};

export const getAppointmentListApi = async (opt = '') => {
  const response = await axios.get(`${urlApi}${opt}`, config);

  return response.data;
};
