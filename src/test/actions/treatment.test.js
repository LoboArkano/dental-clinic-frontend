import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { fetchTreatment } from '../../actions/index';
import treatmentTestData from '../test_data/treatment.json';

const mockStore = configureStore([thunk]);

describe('Test for a single monster api request', () => {
  test('Fetch the monster Abominable Beauty', () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({
      data: treatmentTestData,
    }));

    const store = mockStore([]);

    store.dispatch(fetchTreatment('treatments/8'))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toBe('FETCH_REQUEST');
        expect(actions[1].type).toBe('FETCH_TREATMENT_SUCCESS');
        expect(actions[1].payload).toEqual(treatmentTestData);
        expect(actions[1].payload[0].treatment.name).toEqual('Implants');
      });
  });

  test('Invalid url generate error message', () => {
    const error = 'Error Message';
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(error)));
    const store = mockStore([]);

    store.dispatch(fetchTreatment('treatments/1000'))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toBe('FETCH_REQUEST');
        expect(actions[1].type).toBe('FETCH_TREATMENT_FAILURE');
        expect(actions[1].payload).toEqual(error);
      });
  });
});
