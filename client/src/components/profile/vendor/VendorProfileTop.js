import React from 'react';
import PropTypes from 'prop-types';

const VendorProfileTop = ({
  vendorprofile: {
    company,
    bio,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={avatar} alt='' />
      <h1 className='large'>{company}</h1>
      <p className='lead'>{bio}</p>
      <p>{location}</p>
      <div className='icons my-1'>
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe fa-2x'></i>
          </a>
        )}
        {social && social.twitter && (
          <a href='#' target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x'></i>
          </a>
        )}
        {social && social.facebook && (
          <a href='#' target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {social && social.linkedin && (
          <a href='#' target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x'></i>
          </a>
        )}
        {social && social.youtube && (
          <a href='#' target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x'></i>
          </a>
        )}
        {social && social.instagram && (
          <a href='#' target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        )}
      </div>
    </div>
  );
};

VendorProfileTop.propTypes = {
  vendorprofile: PropTypes.object.isRequired,
};

export default VendorProfileTop;
