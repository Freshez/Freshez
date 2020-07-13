import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCurrentProfile,
  deleteAccount,
  createVendorProfile,
} from '../../actions/vendorprofile';
import DashboardActions from './DashboardActions';
import Spinner from '../layout/Spinner';
import CreateVendorProfile from '../modal/CreateVendorProfile';
import {
  openCreateVendorProfileModal,
  openCreateCustomerProfileModal,
} from '../../actions/modal';
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from 'react-promise-tracker';
import DashboardCreate from './DashboardCreate';

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return promiseInProgress ? <Spinner /> : <DashboardCreate />;
};

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  vendorprofile: { vendorprofile, loading },
  openCreateCustomerProfileModal,
  openCreateVendorProfileModal,
}) => {
  useEffect(() => {
    trackPromise(getCurrentProfile());
  }, [getCurrentProfile]);
  const [createvendorprofilestate, setValue] = React.useState(
    localStorage.getItem('createvendorprofile') || ''
  );
  return user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='user-img'>
        <i className='fas fa-user'></i>
        <h1 className='lead'>{user && user.name}</h1>
      </div>
      {vendorprofile !== null && user !== null ? (
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
          <CreateVendorProfile />
          <LoadingIndicator />
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  openCreateCustomerProfileModal: PropTypes.func.isRequired,
  openCreateVendorProfileModal: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  openCreateVendorProfileModal,
  openCreateCustomerProfileModal,
})(Dashboard);
