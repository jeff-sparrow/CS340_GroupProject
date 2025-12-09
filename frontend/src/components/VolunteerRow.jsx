// Citation:
// Date: 12/08/2025
// Adapted from: CS340 Exporations/Activities
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2

import React from 'react';
import DeleteVolunteerForm from './DeleteVolunteerForm';

const VolunteerRow = ({ rowObject, backendURL, refreshVolunteers }) => {
  const {
    volunteerID,
    fname,
    lname,
    email,
    phone,
    role,
  } = rowObject;

  return (
    <tr>
      <td>{volunteerID}</td>
      <td>{fname}</td>
      <td>{lname}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{role}</td>  
        <DeleteVolunteerForm
          rowObject={rowObject}
          backendURL={backendURL}
          refreshVolunteers={refreshVolunteers}
        />
    </tr>
  );
};

export default VolunteerRow;
