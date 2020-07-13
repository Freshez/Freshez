import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  openCreateVendorProfileModal,
  openCreateCustomerProfileModal,
} from '../../actions/modal';

const DashboardCreate = ({
  auth: { user },
  vendorprofile: { vendorprofile, loading },
  openCreateCustomerProfileModal,
  openCreateVendorProfileModal,
}) => {
  return (
    <Fragment>
      <p>
        {user && user.role === 'Vendor' ? (
          <Link
            to=''
            className='btn btn-light my-1'
            onClick={() => openCreateVendorProfileModal()}
          >
            <i className='fas fa-user-circle text-primary'></i>
          </Link>
        ) : (
          <Link
            to=''
            className='btn btn-primary my-1'
            onClick={() => openCreateCustomerProfileModal()}
          >
            <i class='fas fa-user-circle text-primary'></i>
          </Link>
        )}
        Create Profile
      </p>
    </Fragment>
  );
};

DashboardCreate.propTypes = {
  openCreateCustomerProfileModal: PropTypes.func.isRequired,
  openCreateVendorProfileModal: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  vendorprofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  vendorprofile: state.vendorprofile,
});
export default connect(mapStateToProps, {
  openCreateVendorProfileModal,
  openCreateCustomerProfileModal,
})(DashboardCreate);
