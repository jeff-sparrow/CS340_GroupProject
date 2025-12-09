// Citation:
// Date: 12/08/2025
// Adapted from: CS340 Exporations/Activities
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2

import React from 'react';
import DeleteAidStationForm from './DeleteAidStationForm';

const AidStationRow = ({ rowObject, backendURL, refreshAidStations }) => {
  const {
    stationID,
    raceName,
    stationName,
    mileMarker,
    elevation,
    latitude,
    longitude,
  } = rowObject;

  return (
    <tr>
      <td>{stationID}</td>
      <td>{raceName}</td>
      <td>{stationName}</td>
      <td>{mileMarker}</td>
      <td>{elevation}</td>
      <td>{latitude}</td>
      <td>{longitude}</td>      
        <DeleteAidStationForm
          rowObject={rowObject}
          backendURL={backendURL}
          refreshAidStations={refreshAidStations}
        />
    </tr>
  );
};

export default AidStationRow;
