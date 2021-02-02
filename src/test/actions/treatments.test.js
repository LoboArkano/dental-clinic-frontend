import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { fetchTreatments } from '../../actions/index';
import treatmentsTestData from '../test_data/treatments.json';

const mockStore = configureStore([thunk]);

describe('Test for monsters api request', () => {
  test('Fetch all treatments', () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({
      data: {
        results: treatmentsTestData,
      },
    }));

    const store = mockStore([]);

    store.dispatch(fetchTreatments('treatments'))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toBe('FETCH_REQUEST');
        expect(actions[1].type).toBe('FETCH_TREATMENTS_SUCCESS');
        expect(actions[1].payload).toEqual(treatmentsTestData);
      });
  });

  test('Invalid url generate error message', () => {
    const error = 'Error Message';
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(error)));
    const store = mockStore([]);

    store.dispatch(fetchTreatments('?invalid-url'))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toBe('FETCH_REQUEST');
        expect(actions[1].type).toBe('FETCH_FAILURE');
        expect(actions[1].payload).toEqual(error);
      });
  });
});
