import React, { useState, useEffect } from 'react';
import Header from './Header';
import PartyDetails from './PartyDetails';
import RSVPConfirm from './RSVPConfirm';
import RSVPForm from './RSVPForm';
import NavBar from './NavBar';
import RSVPList from './RSVPList';

function RSVPControl() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);
  const [rsvpList, setRSVPList] = useState([]);
  const [user, setUser] = useState({});
  const [rsvp, setRsvp] = useState(null);
  const [showRSVPList, setShowRSVPList] = useState(null);
  const [partyDetailsPage, setPartyDetailsPage] = useState(true);
  const [confirmationPage, setConfirmationPage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [guest, setGuest] = useState(null);


  useEffect(() => {
    fetch(`https://birthday-party-9f1f9-default-rtdb.firebaseio.com/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`)
        } else {
          return response.json()
        }
      })
      .then((jsonifiedResponse) => {
        setRSVPList(jsonifiedResponse)
        setIsLoaded(true)
      })
      .catch((error) => {
        setError(error.message)
        setIsLoaded(true)
      });
  }, [rsvpList])

  function handlePost(formData) {
    fetch(`https://birthday-party-9f1f9-default-rtdb.firebaseio.com/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then((data) => {
        setUser(data)
        RsvpConfirmationToggler();
      })
      .catch((error) => {
        console.log('Error posting data:', error);
      });
  };
  const getRSVP = async (id) => {
    try {
      const response = await fetch(`https://birthday-party-9f1f9-default-rtdb.firebaseio.com/${id}`);
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      // Update component state with the received RSVP data
    } catch (error) {
      console.error('Error fetching RSVP data:', error);
    }
  };
  const deleteRSVP = async (id) => {
    try {
      const response = await fetch(`https://birthday-party-9f1f9-default-rtdb.firebaseio.com/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      // Update component state to reflect the deletion
    } catch (error) {
      console.error('Error deleting RSVP:', error);
    }
  };
  
  const deleteGuest = (id) => {
    console.log(id);
    fetch(`https://birthday-party-9f1f9-default-rtdb.firebaseio.com/${id}`, {
      method: 'DELETE'
    })
      .catch((error) => {
        console.log('Error deleting data:', error);
      });
    deleteConfirmationPopUp();
    setTimeout(() => {
      homeToggler()
    }, 2000)
  };

  const getGuest = async (id) => {
    fetch(`https://birthday-party-9f1f9-default-rtdb.firebaseio.com/ ${id}`)
      .then(async response => {
        const data = await response.json();

        if (!response.ok) {
          const error = response.statusText;
          return Promise.reject(error);
        }
        setGuest(data);
        guestToggler();
      })
      .catch(error => {
        console.log("There was an error retrieving the requested data", error)
      });
  };
  const homeToggler = () => {
    setPartyDetailsPage(true);
    
    setRsvp(false); // Adjust this based on your component's state variables
    setConfirmationPage(false); // Adjust this based on your component's state variables
  }
  
  const deleteConfirmationPopUp = () => {
    setDeleteConfirm(true);
    setConfirmationPage(false);
  }
  const updateRSVPList = (newRSVP) => {
    setRSVPList([...rsvpList, newRSVP]);
  };
  const showRsvp = () => {
    setRsvp(true);
    setShowRSVPList(false);
    setPartyDetailsPage(false);
  }
  
  const RsvpConfirmationToggler = () => {
    setRsvp(false);
    setShowRSVPList(false);
    setPartyDetailsPage(false);
    setConfirmationPage(true);
  }
  
  const rsvpListToggler = () => {
    setShowRSVPList(true);
    setRsvp(false);
    setPartyDetailsPage(false);
    setConfirmationPage(false);
  }
  
  let currentlyVisible;

  const guestToggler = () => {
    setGuest(!guest); // This will toggle 'guest' between true and false
  };

if (partyDetailsPage) {
  currentlyVisible =
    <>
      <NavBar user={user} homeClick={homeToggler} rsvpClick={showRsvp} />
      <PartyDetails />
    </>
} else if (showRSVPList) {
  error ?
    currentlyVisible = <h1>Error: {error}</h1> :
    (!isLoaded) ?
      currentlyVisible = <h1>Loading...</h1> :
      currentlyVisible =
      <>
        <NavBar user={user} homeClick={homeToggler} rsvpClick={showRsvp} />
        <RSVPList rsvpList={rsvpList} onRSVPClick={getRSVP} />
      </>
} else if (deleteConfirm) {
  currentlyVisible = <h1>You have successfully cancelled your RSVP</h1>
} else if (confirmationPage) {
  currentlyVisible =
    <>
      <NavBar user={user} homeClick={homeToggler} rsvpClick={showRsvp} />
      <RSVPConfirm userInfo={user} looksGood={showRSVPList} delete={deleteRSVP} />
    </>
}

return (
  <>
    <Header />
    {currentlyVisible}
  </>
)
}

export default RSVPControl;