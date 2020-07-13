import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const VendorProfileItem = ({
  vendorprofile: {
    user: { _id, name, avatar },
    company,
    location,
  },
}) => {
  const history = useHistory();
  return (
    <div
      className='profile bg-light'
      onClick={() => {
        history.push(`/vendorprofile/${_id}`);
      }}
    >
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{company}</h2>
        <p className='my-1'>{location}</p>
      </div>
    </div>
  );
};

VendorProfileItem.propTypes = {
  vendorprofile: PropTypes.object.isRequired,
};

export default VendorProfileItem;
