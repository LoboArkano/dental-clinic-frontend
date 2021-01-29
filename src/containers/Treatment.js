import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchTreatment, logout, checkSession } from '../actions/index';
import Error from '../components/Error';

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
    <>
      {
        loading
          ? <h3>Loading</h3>
          : (
            <>
              <button type="button" onClick={handleLogout}>Logout</button>
              <div key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                <p>{item.desc}</p>
              </div>
            </>
          )
      }
    </>
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
