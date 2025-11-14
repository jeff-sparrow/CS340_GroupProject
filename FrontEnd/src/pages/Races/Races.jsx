import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Races() {
  const [races, setRaces] = useState([]);

  // Function to load race data from database
  const getRaces = () => {
    // dummy data 
    const data = [
      {
        raceID: 1,
        name: "Over The Hills",
        date: "2024-12-12",
        distance: 12,
        type: "Trail"
      },
      {
        raceID: 2,
        name: "Country Cross",
        date: "2020-10-10",
        distance: 52,
        type: "Road"
      },
      {
        raceID: 3,
        name: "Ultra Run",
        date: "2026-03-03",
        distance: 146,
        type: "Road"
      }
    ];

    setRaces(data);
  }

  // Function to delete specific race and update filter current data to remove race
  const deleteRace = (raceID) => {
    setRaces((prevRaces) => prevRaces.filter((race) => race.raceID !== raceID));
  }


  useEffect(() => {
    getRaces();
  }, []);


  return (
    <>
      <h2>Races</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Distance (Miles)</th>
            <th>Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {races.map((race) => (
            <tr key={race.raceID}>
              <td><Link className='link' to={`/Races/${race.raceID}`}>{race.name}</Link></td>
              <td>{race.date}</td>
              <td>{race.distance}</td>
              <td>{race.type}</td>
              <td><Link to={`/Races/Edit/${race.raceID}`}>Edit</Link></td>
              <td><button onClick={() => deleteRace(race.raceID)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className="link" to="/Races/Create">Create Race</Link>
    </>
  )
};

export default Races