
import React from 'react';
import DeleteRaceForm from './DeleteRaceForm';

const RacesRow = ({ rowObject, backendURL, refreshRaces }) => {
  const {
    raceID,
    name,
    raceDate,
    distance,
    type,
  } = rowObject;

  return (
    <tr>
      <td>{raceID}</td>
      <td>{name}</td>
      <td>{raceDate}</td>
      <td>{distance}</td>
      <td>{type}</td>
        <DeleteRaceForm
          rowObject={rowObject}
          backendURL={backendURL}
          refreshRaces={refreshRaces}
        />
    </tr>
  );
};

export default RacesRow;
