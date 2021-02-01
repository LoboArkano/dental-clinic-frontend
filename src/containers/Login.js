import React, { useCallback, useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkSession, createSession } from '../actions/index';
import '../assets/stylesheets/login.css';

const Registration = props => {
  const { error, loggedInStatus, loading } = props;
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
    <div className="w-85">
      {
      loading
        ? <></>
        : (
          <div className="d-flex align-i-c f-dir-col show">
            {
              error.length
                ? (
                  <div>{error}</div>
                )
                : ''
            }
            <form className="login-form d-flex f-dir-col align-i-c" onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                name="email"
                className="input"
                placeholder="Email"
                value={state.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                id="password"
                name="password"
                className="input"
                placeholder="Password"
                value={state.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="submit-btn">Login</button>
            </form>
            <div className="session-option">
              <Link to="/sign-up" className="session-link deco">Create a New Account</Link>
            </div>
          </div>
        )
      }
    </div>
  );
};

Registration.propTypes = {
  error: PropTypes.string.isRequired,
  loggedInStatus: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const { user } = state;
  const { error, loggedInStatus, loading } = user;

  return { error, loggedInStatus, loading };
};

const mapDistpatchToProps = {};

export default connect(mapStateToProps, mapDistpatchToProps)(Registration);
