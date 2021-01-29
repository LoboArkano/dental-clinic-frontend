import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchTreatments, logout } from '../actions/index';
import Error from '../components/Error';

const TreatmentList = props => {
  const {
    error, loggedInStatus,
    loading, list,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTreatments('treatments'));
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
    <>
      {
        loading
          ? <h3>Loading</h3>
          : (
            <>
              <button type="button" onClick={handleLogout}>Logout</button>
              {
                list.treatments.map(treatment => (
                  <div key={treatment.name}>
                    <h3>{treatment.name}</h3>
                    <p>{treatment.price}</p>
                  </div>
                ))
              }
            </>
          )
      }
    </>
  );
};

TreatmentList.propTypes = {
  error: PropTypes.string.isRequired,
  loggedInStatus: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf({
    treatments: PropTypes.shape().isRequired,
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
