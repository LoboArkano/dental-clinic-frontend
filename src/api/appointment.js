import axios from 'axios';

const urlApi = 'http://localhost:3001/';

const postAppointmentApi = async (state, opt = '') => {
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

export default postAppointmentApi;
