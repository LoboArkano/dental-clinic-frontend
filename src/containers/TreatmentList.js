import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { fetchTreatments, logout, checkSession } from '../actions/index';
import Error from '../components/Error';
import '../assets/stylesheets/treatmentList.css';
import loadingImg from '../assets/images/loading.png';

const TreatmentList = props => {
  const {
    error, loggedInStatus,
    loading, list,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession('logged_in'));
    if (loggedInStatus) {
      dispatch(fetchTreatments('treatments'));
    }
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
    <div className="w-85 vh-100">
      {
        loading
          ? (
            <div className="loading d-flex w-100">
              <img className="loading-img" src={loadingImg} alt="" />
            </div>
          )
          : (
            <div className="d-flex f-dir-col w-100 h-100 show">
              <button type="button" onClick={handleLogout} className="logout-btn">Logout</button>
              <div className="treatment-list d-flex f-wrap justify-cont-sa w-100">
                {
                  list.treatments.map(treatment => (
                    <Link to={`/treatment/${treatment.id}`} key={treatment.name} className="treatment-card h-max deco">
                      <h3 className="treatment-name">{treatment.name}</h3>
                      <p>{`${treatment.price} USD`}</p>
                    </Link>
                  ))
                }
              </div>
            </div>
          )
      }
    </div>
  );
};

TreatmentList.propTypes = {
  error: PropTypes.string.isRequired,
  loggedInStatus: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  list: PropTypes.shape({
    treatments: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

const mapStateToProps = state => {
  const { user, treatments } = state;
  const { error, loggedInStatus } = user;
  const { loading, list } = treatments;

  return {
    error, loggedInStatus, loading, list,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TreatmentList);
