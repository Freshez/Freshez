import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/vendorprofile';
import DashboardActions from './DashboardActions';
import Spinner from '../layout/Spinner';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  vendorprofile: { vendorprofile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {vendorprofile !== null ? (
        <Fragment>
          <DashboardActions />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus'></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            You have not yet set up a profile, please add some info
            {user && user.role === 'Vendor' ? (
              <Link
                to='/create-vendor-profile'
                className='btn btn-primary my-1'
              >
                <i class='fas fa-user-circle text-primary'></i>
              </Link>
            ) : (
              <Link
                to='/create-customer-profile'
                className='btn btn-primary my-1'
              >
                <i class='fas fa-user-circle text-primary'></i>
              </Link>
            )}
            Create Profile
          </p>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  vendorprofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: state.auth,
  vendorprofile: state.vendorprofile,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
