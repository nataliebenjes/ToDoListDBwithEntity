import React from 'react';
import PropTypes from 'prop-types';

function RSVPConfirm({ userInfo, looksGood, deleteRSVP }) {
  return (
    <div>
      <h2>RSVP Confirmation</h2>
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      <p>Attending: {userInfo.attending ? 'Yes' : 'No'}</p>
      <button onClick={looksGood}>Looks Good</button>
      <button onClick={deleteRSVP}>Cancel RSVP</button>
    </div>
  );
}

RSVPConfirm.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    attending: PropTypes.bool.isRequired,
    // Add any other properties you expect in the userInfo object
  }).isRequired,
  looksGood: PropTypes.func.isRequired,
  deleteRSVP: PropTypes.func.isRequired,
};

export default RSVPConfirm;