import React from 'react';
import loadingImg from '../assets/images/loading.png';

const Loading = () => (
  <div className="loading d-flex w-100">
    <img className="loading-img" src={loadingImg} alt="" />
  </div>
);

export default Loading;
