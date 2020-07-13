import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const VendorProfilePosts = ({
  post: { header, text, name, avatar, date, likes, comments },
}) => (
  <Fragment>
    <div className='profile-post-item'>
      <h3 className='text-dark'>{header}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      <p>
        <strong>{name}</strong>
      </p>
      <p>
        <strong>{text}</strong>
      </p>
    </div>
  </Fragment>
);

VendorProfilePosts.propTypes = {
  post: PropTypes.object.isRequired,
};

export default VendorProfilePosts;
