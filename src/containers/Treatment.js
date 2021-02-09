import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTreatment, logout } from '../actions/index';
import Error from '../components/Error';
import '../assets/stylesheets/treatment.css';
import Loading from '../components/Loading';

const Treatment = props => {
  const {
    user, history,
    loading, item, match,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTreatment(`treatments/${match.params.id}`, match.params.id));
  }, []);

  useEffect(() => {
    if (!user.loggedInStatus && !user.loading) {
      history.push('/login');
    }
  }, [user.loggedInStatus]);

  const handleLogout = useCallback(() => {
    dispatch(logout('logout'));
  });

  if (user.error.length) {
    return <Error />;
  }

  return (
    <main className="w-85">
      {
        loading
          ? (
            <Loading />
          )
          : (
            <section className="d-flex f-dir-col w-100 show">
              <button type="button" onClick={handleLogout} className="logout-btn">Logout</button>
              <article key={item.name} className="treatment w-100">
                <h2 className="treat-name">{`Treatment: ${item.name}`}</h2>
                <p className="treat-price">{`Price: ${item.price}`}</p>
                <p className="treat-desc">{`${item.desc}`}</p>
                <Link to="/appointment-form" className="appointment-link deco">
                  Make an Appointment
                </Link>
              </article>
            </section>
          )
      }
    </main>
  );
};

Treatment.propTypes = {
  user: PropTypes.shape({
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    loggedInStatus: PropTypes.bool.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  item: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = state => {
  const { user, treatments } = state;
  const { loading, item } = treatments;

  return {
    user, loading, item,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Treatment);
