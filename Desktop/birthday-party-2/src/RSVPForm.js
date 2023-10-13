import React, { useState } from 'react';

const RSVPForm = ({ onRSVPClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    attending: true, // Assuming a checkbox or radio button for attending/not attending
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRSVPClick(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>
          Attending:
          <input
            type="checkbox"
            name="attending"
            checked={formData.attending}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">Your Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit RSVP Babyyyy</button>
    </form>
  );
};

export default RSVPForm;
