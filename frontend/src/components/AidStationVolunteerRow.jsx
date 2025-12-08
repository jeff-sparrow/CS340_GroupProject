
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
        {/* <DeleteVolunteerForm
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