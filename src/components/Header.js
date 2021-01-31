import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/stylesheets/header.css';

const Header = () => (
  <div className="header-container d-flex justiy-cont-sb f-dir-col">
    <div className="nav d-flex justiy-cont-sb f-dir-col">
      <Link to="/" className="deco">
        <h1 className="brand">Dental Clinic</h1>
      </Link>
      <ul>
        <Link to="/treatments" className="deco"><li className="nav-item">TREATMENTS</li></Link>
        <Link to="/appointments" className="deco"><li className="nav-item">APPOINTMENTS</li></Link>
      </ul>
    </div>
    <div className="w-100">
      <ul className="social d-flex justiy-cont-sa">
        <li className="item">
          <a className="profile-link" href="https://github.com/LoboArkano" target="_blank" rel="noreferrer" aria-label="Github"><i className="fab fa-github" /></a>
        </li>
        <li className="item">
          <a className="profile-link" href="https://www.linkedin.com/in/jose-roberto-perez-jimenez/" target="_blank" rel="noreferrer" aria-label="Linkedin"><i className="fab fa-linkedin" /></a>
        </li>
        <li className="item">
          <a className="profile-link" href="https://angel.co/u/jose-roberto-perez-jimenez" target="_blank" rel="noreferrer" aria-label="AngelList"><i className="fab fa-angellist" /></a>
        </li>
        <li className="item">
          <a className="profile-link" href="https://twitter.com/LoboArcano92" target="_blank" rel="noreferrer" aria-label="Twitter"><i className="fab fa-twitter-square" /></a>
        </li>
      </ul>
    </div>
  </div>
);

export default Header;
