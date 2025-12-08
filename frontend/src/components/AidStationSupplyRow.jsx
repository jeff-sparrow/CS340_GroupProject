

import React from 'react';
import DeleteSupplyForm from './DeleteSupplyForm';

function AidStationSupplyRow({ rowObject, backendURL, refreshData }) {
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
      <td>
        <DeleteSupplyForm
          rowObject={{
            stationSupplyID,
            stationID,
            supplyID,
            supplyName,
            category,
            quantity,
          }}
          backendURL={backendURL}
          refreshData={refreshData}
        />
      </td>
    </tr>
  );
}

export default AidStationSupplyRow;

