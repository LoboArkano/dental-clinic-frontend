import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => (
  <div>
    Main Page
    <Link to="/sign-up">Create Account</Link>
    <Link to="/login">Login</Link>
  </div>
);

export default Main;
