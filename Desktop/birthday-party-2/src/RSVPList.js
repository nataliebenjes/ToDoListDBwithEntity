import React from 'react';
import PropTypes from 'prop-types';

function RSVPList({ rsvpList, onRSVPClick }) {
  return (
    <div>
      <h2>RSVP List</h2>
      <ul>
        {rsvpList.map(rsvp => (
          <li key={rsvp.id}>
            <span>{rsvp.name}</span>
            <button onClick={() => onRSVPClick(rsvp.id)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

RSVPList.propTypes = {
  rsvpList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onRSVPClick: PropTypes.func.isRequired,
};

export default RSVPList;