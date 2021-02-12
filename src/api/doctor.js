import axios from 'axios';
import urlApi from './urlApi';
import 'regenerator-runtime/runtime';

const config = { withCredentials: true, headers: { 'Access-Control-Allow-Origin': '*' } };

const getDoctorListApi = async (opt = '') => {
  const response = await axios.get(`${urlApi}${opt}`, config);

  return response.data;
};

export default getDoctorListApi;
