import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import {
  openLoginModal,
  closeLoginModal,
  openRegisterModal,
  closeRegisterModal,
} from '../../actions/modal';

const Navbar = ({
  auth: { isAuthenticated, loading },
  logout,
  openLoginModal,
  openRegisterModal,
  closeLoginModal,
  closeRegisterModal,
  loginModalOpen,
  regsiterModalOpen,
}) => {
  const [hovered_login, setHoveredLogin] = useState(false);
  const [hovered_dev_connector, setHoveredDevConnector] = useState(false);
  const [hovered_register, setHoveredRegister] = useState(false);
  const [hovered_vendors, setHoveredVendors] = useState(false);
  const [hovered_posts, setHoveredPosts] = useState(false);
  const [hovered_dashboard, setHoveredDashboard] = useState(false);
  const [hovered_logout, setHoveredLogout] = useState(false);
  const toggleHoverLogin = () => setHoveredLogin(!hovered_login);
  const toggleHoverDevConnector = () =>
    setHoveredDevConnector(!hovered_dev_connector);
  const toggleHoverRegister = () => setHoveredRegister(!hovered_register);
  const toggleHoverVendors = () => setHoveredVendors(!hovered_vendors);
  const toggleHoverPosts = () => setHoveredPosts(!hovered_posts);
  const toggleHoverDashboard = () => setHoveredDashboard(!hovered_dashboard);
  const toggleHoverLogout = () => setHoveredLogout(!hovered_logout);
  const authLinks = (
    <ul>
      <li>
        <div
          className={hovered_vendors ? 'nav-link-hovered nav-link' : 'nav-link'}
          onMouseEnter={toggleHoverVendors}
          onMouseLeave={toggleHoverVendors}
        >
          <Link to='/vendorprofiles'>Vendors</Link>
        </div>
      </li>
      <li>
        <div
          className={hovered_posts ? 'nav-link-hovered nav-link' : 'nav-link'}
          onMouseEnter={toggleHoverPosts}
          onMouseLeave={toggleHoverPosts}
        >
          <Link to='/posts'>Posts</Link>
        </div>
      </li>
      <li>
        <div
          className={
            hovered_dashboard ? 'nav-link-hovered nav-link' : 'nav-link'
          }
          onMouseEnter={toggleHoverDashboard}
          onMouseLeave={toggleHoverDashboard}
        >
          <Link to='/dashboard'>
            <i className='fas fa-user'></i>{' '}
            <span className='hide-sm'>Dashboard</span>
          </Link>
        </div>
      </li>
      <li>
        <div
          className={hovered_logout ? 'nav-link-hovered nav-link' : 'nav-link'}
          onMouseEnter={toggleHoverLogout}
          onMouseLeave={toggleHoverLogout}
        >
          <a onClick={logout} href='#!'>
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </div>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <div
          className={hovered_vendors ? 'nav-link-hovered nav-link' : 'nav-link'}
          onMouseEnter={toggleHoverVendors}
          onMouseLeave={toggleHoverVendors}
        >
          <Link to='/vendorprofiles'>Vendors</Link>
        </div>
      </li>
      <li>
        <div
          className={
            hovered_register ? 'nav-link-hovered nav-link' : 'nav-link'
          }
          onMouseEnter={toggleHoverRegister}
          onMouseLeave={toggleHoverRegister}
        >
          <Link id='registerLink' to='' onClick={() => openRegisterModal()}>
            Register
          </Link>
        </div>
      </li>
      <li>
        <div
          className={hovered_login ? 'nav-link-hovered nav-link' : 'nav-link'}
          onMouseEnter={toggleHoverLogin}
          onMouseLeave={toggleHoverLogin}
        >
          <Link id='loginLink' to='' onClick={() => openLoginModal()}>
            Login
          </Link>
        </div>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-white'>
      <h1>
        <div
          className={
            hovered_dev_connector ? 'nav-link-hovered nav-link' : 'nav-link'
          }
          onMouseEnter={toggleHoverDevConnector}
          onMouseLeave={toggleHoverDevConnector}
        >
          <Link to='/'>
            <i className='fas fa-code'></i> Freshez
          </Link>
        </div>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  loginModalOpen: PropTypes.bool.isRequired,
  regsiterModalOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  vendorprofile: state.vendorprofile,
  customerprofile: state.customerprofile,
  loginModalOpen: state.modal.login_open,
  regsiterModalOpen: state.modal.register_open,
});

export default connect(mapStateToProps, {
  logout,
  openLoginModal,
  openRegisterModal,
  closeLoginModal,
  closeRegisterModal,
})(Navbar);
