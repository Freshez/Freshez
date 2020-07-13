import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { login } from '../../actions/auth';

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

const Login = ({
  isAuthenticated,
  openLoginModal,
  openRegisterModal,
  closeLoginModal,
  closeRegisterModal,
  loginModalOpen,
  regsiterModalOpen,
  login,
}) => {
  var subtitle;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Set form data to copy of formData with changed value
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
    openLoginModal();
  }

  function closeModal() {
    setIsOpen(false);
    closeLoginModal();
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Redirect if logged in TODO - close modal if authenticated?
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div>
      <Modal
        isOpen={loginModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <Fragment>
          <div className='close-btn-outline'>
            <button
              type='button'
              className='btn close-btn'
              aria-label='Close'
              onClick={() => closeLoginModal()}
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <h1 className='large text-info'>Sign In</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Sign Into Your Account
          </p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => onChange(e)}
                name='email'
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                minLength='6'
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Login' />
          </form>
          <p className='my-1'>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </p>
        </Fragment>
      </Modal>
    </div>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired,
  loginModalOpen: PropTypes.bool,
  regsiterModalOpen: PropTypes.bool,
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
  login,
})(Login);
