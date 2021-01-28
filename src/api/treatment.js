import axios from 'axios';

const urlApi = 'http://localhost:3001/';

const getTreatmentListApi = async (opt = '') => {
  const response = await axios.get(`${urlApi}${opt}`, { withCredentials: true });

  return response.data;
};

export default getTreatmentListApi;
