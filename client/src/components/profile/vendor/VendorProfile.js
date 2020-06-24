import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getProfileById } from '../../../actions/vendorprofile';
import VendorProfileTop from './VendorProfileTop';
import VendorProfileAbout from './VendorProfileAbout';

const VendorProfile = ({
  match,
  getProfileById,
  vendorprofile: { vendorprofile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {vendorprofile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === vendorprofile.user._id &&
            vendorprofile.role === 'Vendor' && (
              <Link to='/edit-vendor-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === vendorprofile.user._id &&
            vendorprofile.role === 'Customer' && (
              <Link to='/edit-customer-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div class='profile-grid my-1'>
            <VendorProfileTop vendorprofile={vendorprofile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

VendorProfile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  vendorprofile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  vendorprofile: state.vendorprofile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(VendorProfile);
