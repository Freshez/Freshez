import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Register from '../modal/Register';
import Login from '../modal/Login';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {
  openLoginModal,
  closeLoginModal,
  openRegisterModal,
  closeRegisterModal,
} from '../../actions/modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '75%',
  },
};

const Landing = ({
  isAuthenticated,
  openLoginModal,
  openRegisterModal,
  closeLoginModal,
  closeRegisterModal,
  loginModalOpen,
  regsiterModalOpen,
}) => {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
    openLoginModal();
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    closeLoginModal();
  }

  if (isAuthenticated) {
    console.log(isAuthenticated);
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Freshez</h1>
          <p className='lead'>A platform for plant based eating</p>
          <div className='buttons'>
            <Link
              to=''
              className='btn btn-primary'
              onClick={() => openRegisterModal()}
            >
              Sign Up
            </Link>
            <Link
              to=''
              className='btn btn-light'
              onClick={() => openLoginModal()}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  loginModalOpen: PropTypes.bool.isRequired,
  regsiterModalOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginModalOpen: state.modal.login_open,
  regsiterModalOpen: state.modal.login_open,
});

export default connect(mapStateToProps, {
  openLoginModal,
  openRegisterModal,
  closeLoginModal,
  closeRegisterModal,
})(Landing);
