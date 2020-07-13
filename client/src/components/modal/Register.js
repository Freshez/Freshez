import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { setAlert } from '../../actions/alert';
import {
  register,
  deselectRole,
  selectVendor,
  selectCustomer,
} from '../../actions/auth';
import {
  openLoginModal,
  closeLoginModal,
  openRegisterModal,
  closeRegisterModal,
  openCreateVendorProfileModal,
} from '../../actions/modal';
import useWindowDimensions from '../../utils/getWindowDimensions';

const customStyles = {
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '80%',
    width: '50%',
  },
};

const Register = ({
  isAuthenticated,
  setAlert,
  register,
  openLoginModal,
  openRegisterModal,
  closeLoginModal,
  closeRegisterModal,
  loginModalOpen,
  regsiterModalOpen,
  createVendorProfileModalOpen,
  openCreateVendorProfileModal,
  selectVendor,
  selectCustomer,
  deselectRole,
  vendorSelected,
  customerSelected,
}) => {
  var subtitle;
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    password: '',
    password2: '',
  });

  const { height, width } = useWindowDimensions();

  if (width > 700) {
    customStyles.content = {
      top: '55%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '80%',
      width: '50%',
    };
  } else {
    customStyles.content = {
      top: '60%',
      left: '50%',
      right: 'auto',
      bottom: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '80%',
      width: '60%',
    };
  }
  // eslint-disable-next-line
  const { name, role, email, password, password2 } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, role, email, password });
    }
    closeRegisterModal();
    openCreateVendorProfileModal();
    deselectRole();
  };

  // Set form data to copy of formData with changed value
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Set form data to copy of formData with changed role
  const onClick = (e) => {
    console.log('Target.name ' + e.target.name);
    console.log('Target.value ' + e.target.value);
    if (e.target.value == 'Vendor') selectVendor();
    if (e.target.value == 'Customer') selectCustomer();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openLogin = (e) => {
    closeRegisterModal();
    openLoginModal();
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
    openRegisterModal();
  }

  function closeModal() {
    setIsOpen(false);
    closeRegisterModal();
  }

  // Redirect if logged in TODO - close modal if authenticated?
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div>
      <Modal
        isOpen={regsiterModalOpen}
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
              onClick={() => closeRegisterModal()}
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <h1 className='large-2 text-info'>Sign Up</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Create Your Account
          </p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              {/* <input
                type='role'
                placeholder='Customer'
                className='btn btn-role'
                name='role'
                value='Customer'
                onChange={(e) => onChange(e)}
                onClick={(e) => onClick(e)}
                // eslint-disable-next-line
                type='button'
              />
              <input
                type='role'
                placeholder='Vendor'
                className='btn btn-role'
                name='role'
                value='Vendor'
                onChange={(e) => onChange(e)}
                onClick={(e) => onClick(e)}
                // eslint-disable-next-line
                type='button'
              /> */}
              <input
                type='role'
                placeholder='Customer'
                name='role'
                value='Customer'
                onChange={(e) => onChange(e)}
                onClick={(e) => onClick(e)}
                // eslint-disable-next-line
                type='button'
                className={
                  customerSelected === true
                    ? 'btn btn-role btn-primary'
                    : 'btn btn-primary'
                }
                type='button'
              ></input>
              <input
                type='role'
                placeholder='Vendor'
                name='role'
                value='Vendor'
                onChange={(e) => onChange(e)}
                onClick={(e) => onClick(e)}
                // eslint-disable-next-line
                type='button'
                className={
                  vendorSelected === true
                    ? 'btn btn-role btn-primary'
                    : 'btn btn-primary'
                }
                type='button'
              ></input>
            </div>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={(e) => onChange(e)}
                name='email'
              />
              <small className='form-text'></small>
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Register' />
          </form>
          <p className='my-1'>
            Already have an account?{' '}
            <Link
              to=''
              onClick={() => {
                openLogin();
              }}
            >
              Sign In
            </Link>
          </p>
        </Fragment>
      </Modal>
    </div>
  );
};

Register.propTypes = {
  openCreateVendorProfileModal: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  loginModalOpen: PropTypes.bool,
  regsiterModalOpen: PropTypes.bool,
  createVendorProfileModalOpen: PropTypes.bool,
  vendorSelected: PropTypes.bool,
  customerSelected: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginModalOpen: state.modal.login_open,
  regsiterModalOpen: state.modal.register_open,
  createVendorProfileModalOpen: state.modal.create_vendor_open,
  vendorSelected: state.auth.vendorSelected,
  customerSelected: state.auth.customerSelected,
});

export default connect(mapStateToProps, {
  openLoginModal,
  openRegisterModal,
  closeLoginModal,
  closeRegisterModal,
  openCreateVendorProfileModal,
  register,
  setAlert,
  selectVendor,
  selectCustomer,
  deselectRole,
})(Register);
