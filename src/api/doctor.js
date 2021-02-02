import axios from 'axios';
import urlApi from './urlApi';
import 'regenerator-runtime/runtime';

const getDoctorListApi = async (opt = '') => {
  const response = await axios.get(`${urlApi}${opt}`, { withCredentials: true });

  return response.data;
};

export default getDoctorListApi;
