import axios from 'axios';

const urlApi = 'http://localhost:3001/';

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
