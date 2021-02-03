import React, { useCallback, useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkSession, postUser } from '../actions/index';
import '../assets/stylesheets/sign-up.css';
import loadingImg from '../assets/images/loading.png';

const Registration = props => {
  const { error, loggedInStatus, loading } = props;
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
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
    dispatch(postUser(state, 'registrations'));
    e.preventDefault();
  });

  if (loggedInStatus) {
    return <Redirect to="/" />;
  }

  return (
    <main className="w-85">
      {
        loading
          ? (
            <div className="loading d-flex w-100">
              <img className="loading-img" src={loadingImg} alt="" />
            </div>
          )
          : (
            <section className="d-flex align-i-c f-dir-col show">
              {
                error.length
                  ? (
                    <div>{error}</div>
                  )
                  : ''
              }
              <form className="sign-up-form d-flex f-dir-col align-i-c" onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input"
                  placeholder="Username"
                  value={state.name}
                  onChange={handleChange}
                  required
                />
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
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  className="input"
                  placeholder="Password Confirmation"
                  value={state.password_confirmation}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="submit-btn">Create Account</button>
              </form>
              <div className="session-option">
                <Link to="/login" className="session-link deco">I Have an Account</Link>
              </div>
            </section>
          )
      }
    </main>
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
