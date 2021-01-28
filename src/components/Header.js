import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div>
    <Link to="/">
      <h1 className="brand">Dental Clinic</h1>
    </Link>
    <ul>
      <li><Link to="/treatments">Treatments</Link></li>
      <li><Link to="/appointments">Appointment</Link></li>
    </ul>
    <div className="social" />
  </div>
);

export default Header;
