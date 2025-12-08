
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
