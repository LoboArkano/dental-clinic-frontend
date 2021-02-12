import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTreatments, logout } from '../actions/index';
import Error from '../components/Error';
import '../assets/stylesheets/treatmentList.css';
import Loading from '../components/Loading';

const TreatmentList = props => {
  const {
    user, history,
    loading, list,
  } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTreatments('treatments'));
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
    <main className="w-85 vh-100">
      {
        loading
          ? (
            <Loading />
          )
          : (
            <div className="d-flex f-dir-col w-100 h-100 show">
              <button type="button" onClick={handleLogout} className="logout-btn">Logout</button>
              <section className="treatment-list d-flex f-wrap justify-cont-sa w-100">
                {
                  list.map(treatment => (
                    <Link to={`/treatment/${treatment.id}`} className="treatment-card h-max deco" key={treatment.name}>
                      <article>
                        <h3 className="treatment-name">{treatment.name}</h3>
                        <p>{`${treatment.price} USD`}</p>
                      </article>
                    </Link>
                  ))
                }
              </section>
            </div>
          )
      }
    </main>
  );
};

TreatmentList.propTypes = {
  user: PropTypes.shape({
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    loggedInStatus: PropTypes.bool.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = state => {
  const { user, treatments } = state;
  const { loading, list } = treatments;

  return {
    user, loading, list,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TreatmentList);
