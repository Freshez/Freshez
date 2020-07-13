import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getProfileById, getPosts } from '../../../actions/vendorprofile';
import VendorProfileTop from './VendorProfileTop';
import VendorProfileAbout from './VendorProfileAbout';
import VendorProfilePosts from './VendorProfilePosts';
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
          <div className=''>
            <VendorProfileTop vendorprofile={vendorprofile} />
            <h2 className='text-primary profile-h2'>Posts</h2>
            <div className='profile-posts bg-light p-2'>
              {vendorprofile.posts.length > 0 ? (
                <Fragment>
                  {vendorprofile.posts.map((post) => (
                    <VendorProfilePosts key={post._id} post={post} />
                  ))}
                </Fragment>
              ) : (
                <h4>No Posts</h4>
              )}
            </div>

            <h2 className='text-primary profile-h2'>Products</h2>
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
  posts: state.vendorprofile.posts,
});

export default connect(mapStateToProps, { getProfileById })(VendorProfile);
