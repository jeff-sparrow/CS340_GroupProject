// Citation:
// Date: 12/08/2025
// Adapted from: CS340 Exporations/Activities
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2

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
