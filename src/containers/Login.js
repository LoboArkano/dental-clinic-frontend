import React, { useCallback, useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkSession, createSession } from '../actions/index';

const Registration = props => {
  const { error, loggedInStatus } = props;
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession('logged_in'));
  }, []);

  const handleChange = useCallback(e => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  });

  const handleSubmit = useCallback(e => {
    dispatch(createSession(state, 'sessions'));
    e.preventDefault();
  });

  if (loggedInStatus) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      {
        error.length
          ? (
            <div>{error}</div>
          )
          : ''
      }
      <form>
        <h4>Login</h4>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
            required
          />
          <button type="submit" onClick={handleSubmit}>Login</button>
        </div>
      </form>
      <div>
        <Link to="/sign-up">Create New Account</Link>
      </div>
    </div>
  );
};

Registration.propTypes = {
  error: PropTypes.string.isRequired,
  loggedInStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const { user } = state;
  const { error, loggedInStatus } = user;

  return { error, loggedInStatus };
};

const mapDistpatchToProps = {};

export default connect(mapStateToProps, mapDistpatchToProps)(Registration);
