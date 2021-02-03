import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/stylesheets/main.css';

const Main = () => (
  <main className="main w-100 d-flex align-i-fe justify-cont-fe show">
    <div className="session d-flex justify-cont-sb">
      <Link to="/sign-up" className="session-btn deco">Create Account</Link>
      <Link to="/login" className="session-btn deco">Login</Link>
    </div>
  </main>
);

export default Main;
