
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

