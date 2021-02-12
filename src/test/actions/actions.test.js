import {
  fetchRequest, fetchFailure, fetchTreatmentsSuccess, fetchTreatmentSuccess,
} from '../../actions/index';
import treatmentsTestData from '../test_data/treatments.json';
import treatmentTestData from '../test_data/treatment.json';

describe('Test for actions', () => {
  test('Receive action request', () => {
    const action = {
      type: 'FETCH_REQUEST',
    };

    expect(fetchRequest().type).toEqual(action.type);
  });

  test('Receive treatment failure action', () => {
    const error = 'Error Message';
    const action = {
      type: 'FETCH_FAILURE',
      payload: error,
    };

    expect(fetchFailure(error).type).toEqual(action.type);
    expect(fetchFailure(error).payload).toEqual(action.payload);
  });

  test('Receive treatments success action', () => {
    const action = {
      type: 'FETCH_TREATMENTS_SUCCESS',
      payload: treatmentsTestData,
    };

    expect(fetchTreatmentsSuccess(treatmentsTestData).type).toEqual(action.type);
    expect(fetchTreatmentsSuccess(treatmentsTestData).payload).toEqual(action.payload);
  });

  test('Receive treatment success action', () => {
    const action = {
      type: 'FETCH_TREATMENT_SUCCESS',
      payload: treatmentTestData,
    };

    expect(fetchTreatmentSuccess(treatmentTestData).type).toEqual(action.type);
    expect(fetchTreatmentSuccess(treatmentTestData).payload).toEqual(action.payload);
  });
});
