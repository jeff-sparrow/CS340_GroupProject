// Citation:
// Date: 12/08/2025
// Adapted from: CS340 Exporations/Activities
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2

import React from 'react';
import DeleteVolunteerForm from './DeleteVolunteerForm';

function AidStationVolunteerRow({ rowObject, backendURL, refreshData }) {
  const {
    stationVolunteerID,
    stationName,
    volunteerID,
    fname,
    lname,
    role,
  } = rowObject;

  return (
    <tr>
      <td>{stationName}</td>
      <td>{lname}</td>
      <td>{fname}</td>
      <td>{role}</td>
        {/* TBI <DeleteVolunteerForm
          rowObject={{
            stationVolunteerID,
            stationID: rowObject.stationID,
            volunteerID,
            fname,
            lname,
            stationName,
          }}
          backendURL={backendURL}
          refreshData={refreshData}
        /> */}
    </tr>
  );
}

export default AidStationVolunteerRow;
