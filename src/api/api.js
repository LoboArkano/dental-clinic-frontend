import axios from 'axios';
import urlApi from './urlApi';
import 'regenerator-runtime/runtime';

const config = { withCredentials: true, headers: { 'Access-Control-Allow-Origin': '*' } };

export const postUserApi = async (state, opt = '') => {
  const response = await axios.post(`${urlApi}${opt}`, {
    user: {
      name: state.name,
      email: state.email,
      password: state.password,
      password_confirmation: state.password_confirmation,
    },
  },
  config);

  return response.data;
};

export const createSessionApi = async (state, opt = '') => {
  const response = await axios.post(`${urlApi}${opt}`, {
    user: {
      email: state.email,
      password: state.password,
    },
  },
  config);

  return response.data;
};

export const checkSessionApi = async (opt = '') => {
  const response = await axios.get(`${urlApi}${opt}`, config);
  return response.data;
};

export const logoutApi = async (opt = '') => {
  const response = await axios.delete(`${urlApi}${opt}`, config);

  return response.data;
};
