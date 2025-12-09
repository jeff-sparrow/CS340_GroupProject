// Citation:
// Date: 12/08/2025
// Adapted from: CS340 Exporations/Activities
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2

import React from 'react';
import DeleteAidStationSupplyForm from './DeleteAidStationSupplyForm';

function AidStationSupplyRow({ rowObject, backendURL, refreshASS }) {
  const {
    stationSupplyID,
    stationID,
    stationName,
    supplyID,
    supplyName,
    category,
    quantity,
  } = rowObject;

  return (
    <tr>
      <td>{stationName}</td>
      <td>{supplyName}</td>
      <td>{category}</td>
      <td>{quantity}</td>
        <DeleteAidStationSupplyForm
          rowObject={{
            stationSupplyID,
            stationID,
            supplyID,
            supplyName,
            category,
            quantity,
            stationName,
          }}
          backendURL={backendURL}
          refreshASS={refreshASS}
        />
    </tr>
  );
}

export default AidStationSupplyRow;

