import axios from 'axios';
import urlApi from './urlApi';
import 'regenerator-runtime/runtime';

export const getTreatmentListApi = async (opt = '') => {
  const response = await axios.get(`${urlApi}${opt}`, { withCredentials: true });

  return response.data;
};

export const getTreatmentApi = async (opt = '', id) => {
  const response = await axios.get(`${urlApi}${opt}`, {
    id,
  },
  { withCredentials: true });

  return response.data;
};
