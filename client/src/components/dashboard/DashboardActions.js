import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/vendorprofile';

const DashboardActions = ({
  getCurrentProfile,
  auth: { user },
  vendorprofile: { vendorprofile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <div className='dash-buttons'>
      {user && user.role === 'Vendor' ? (
        <Link to='/edit-vendor-profile' className='btn btn-light'>
          <i className='fas fa-user-circle text-primary'></i> Edit Profile
        </Link>
      ) : (
        <Link to='/edit-customer-profile' className='btn btn-primary my-1'>
          <i className='fas fa-user-circle text-primary'></i> Edit Profile
        </Link>
      )}

      <Link to='/add-product' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary'></i> Add Product
      </Link>
    </div>
  );
};

DashboardActions.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  vendorprofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  vendorprofile: state.vendorprofile,
});

export default connect(mapStateToProps, { getCurrentProfile })(
  DashboardActions
);
