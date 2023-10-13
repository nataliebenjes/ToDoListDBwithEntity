import React from 'react';

function NavBar({ homeClick, memberListClick, rsvpClick }) {
  return (
    <nav>
      <ul>
        <li><button onClick={homeClick}>Home</button></li>
        {/* <li>npm>Member List</button></li> */}
        <li><button onClick={rsvpClick}>RSVP</button></li>
      </ul>
    </nav>
  );
}

export default NavBar;