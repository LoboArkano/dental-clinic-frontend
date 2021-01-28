import axios from 'axios';

const urlApi = 'http://localhost:3001/';

export const postUserApi = async (state, opt = '') => {
  const response = await axios.post(`${urlApi}${opt}`, {
    user: {
      name: state.name,
      email: state.email,
      password: state.password,
      password_confirmation: state.password_confirmation,
    },
  },
  { withCredentials: true });

  return response.data;
};

export const createSessionApi = async (state, opt = '') => {
  const response = await axios.post(`${urlApi}${opt}`, {
    user: {
      email: state.email,
      password: state.password,
    },
  },
  { withCredentials: true });

  return response.data;
};

export const checkSessionApi = async (opt = '') => {
  const response = await axios.get(`${urlApi}${opt}`,
    { withCredentials: true });
  return response.data;
};

export const logoutApi = async (opt = '') => {
  const response = await axios.delete(`${urlApi}${opt}`,
    { withCredentials: true });

  return response.data;
};
