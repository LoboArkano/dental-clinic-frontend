import React from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Treatment = () => (
  <div>
    Hello from Treatment
  </div>
);

Treatment.propTypes = {
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Treatment);
