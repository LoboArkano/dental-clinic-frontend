import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';
import rootReducer from './reducers';

const INITIAL_STATE = {
  appointments: {
    loading: false,
    error: '',
    list: [],
    item: {},
  },
  doctors: {
    loading: false,
    error: '',
    list: [],
  },
  treatments: {
    loading: false,
    error: '',
    list: [],
    item: {},
  },
  user: {
    loading: false,
    error: '',
    loggedInStatus: false,
    data: {},
  },
};

const store = createStore(rootReducer, INITIAL_STATE, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
