import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import VendorProfileItem from './VendorProfileItem';
import { getProfiles } from '../../../actions/vendorprofile';
import vendorprofile from '../../../reducers/vendorprofile';

const VendorProfiles = ({
  getProfiles,
  vendorprofile: { vendorprofiles, loading },
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {vendorprofiles === null || vendorprofiles.length === 0 ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Vendors</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse vendors near you
          </p>
          <div className='profiles'>
            {vendorprofiles.length > 0 ? (
              vendorprofiles.map((vendorprofile) => (
                <VendorProfileItem
                  key={vendorprofile._id}
                  vendorprofile={vendorprofile}
                />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

VendorProfiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  vendorprofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  vendorprofile: state.vendorprofile,
});

export default connect(mapStateToProps, { getProfiles })(VendorProfiles);
