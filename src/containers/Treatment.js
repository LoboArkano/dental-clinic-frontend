import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { fetchTreatment, logout, checkSession } from '../actions/index';
import Error from '../components/Error';
import '../assets/stylesheets/treatment.css';

const Treatment = props => {
  const {
    error, loggedInStatus,
    loading, item, match,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession('logged_in'));
    dispatch(fetchTreatment(`treatments/${match.params.id}`, match.params.id));
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout('logout'));
  });

  if (error.length) {
    return <Error />;
  }

  if (!loggedInStatus) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="w-85">
      {
        loading
          ? <></>
          : (
            <div className="d-flex f-dir-col w-100 show">
              <button type="button" onClick={handleLogout} className="logout-btn">Logout</button>
              <div key={item.name} className="treatment w-100">
                <h3 className="treat-name">{`Treatment: ${item.name}`}</h3>
                <p className="treat-price">{`Price: ${item.price}`}</p>
                <p className="treat-desc">{`${item.desc}`}</p>
                <Link to="/appointment-form" className="appointment-link deco">
                  Make an Appointment
                </Link>
              </div>
            </div>
          )
      }
    </div>
  );
};

Treatment.propTypes = {
  error: PropTypes.string.isRequired,
  loggedInStatus: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  item: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};

const mapStateToProps = state => {
  const { user, treatments } = state;
  const { error, loggedInStatus } = user;
  const { loading, item } = treatments;

  return {
    error, loggedInStatus, loading, item,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Treatment);
