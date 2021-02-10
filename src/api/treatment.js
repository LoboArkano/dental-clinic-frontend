import axios from 'axios';
import urlApi from './urlApi';
import 'regenerator-runtime/runtime';

const config = { withCredentials: true, headers: { 'Access-Control-Allow-Origin': '*' } };

export const getTreatmentListApi = async (opt = '') => {
  const response = await axios.get(`${urlApi}${opt}`, config);

  return response.data;
};

export const getTreatmentApi = async (opt = '', id) => {
  const response = await axios.get(`${urlApi}${opt}`, {
    id,
  },
  config);

  return response.data;
};
