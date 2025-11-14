import { useState } from "react";
import { Link } from "react-router-dom";

function AidStations() {
  const [stations, setStations] = useState([
    {
      stationID: 1,
      raceID: 2,
      name: "The Hub",
      mileMarker: 3,
      elevation: 1000,
      latitude: 22,
      longitude: 123
    },
    {
      stationID: 2,
      raceID: 2,
      name: "Free Candy",
      mileMarker: 36,
      elevation: 324,
      latitude: 45,
      longitude: -180
    },
    {
      stationID: 3,
      raceID: 3,
      name: "Gatorade Pool",
      mileMarker: 100,
      elevation: 6523,
      latitude: 90,
      longitude: 45
    }
  ]);

  // Dummy delete handler
  const handleDelete = (id) => {
    setStations((prev) => prev.filter((station) => station.stationID !== id));
  };

  return (
    <div>
      <h2>Aid Stations</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mile Marker</th>
            <th>Elevation</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {stations.map((station) => (
            <tr key={station.stationID}>
              <td><Link className='link' to={`/AidStations/${station.stationID}`}>{station.name}</Link></td>
              <td>{station.mileMarker}</td>
              <td>{station.elevation}</td>
              <td>{station.latitude}</td>
              <td>{station.longitude}</td>
              <td><Link className='link' to={`/AidStations/Edit/${station.stationID}`}>Edit</Link></td>
              <td><button onClick={() => handleDelete(station.stationID)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className="link" to="/AidStations/Create">
        Create Aid Station
      </Link>
    </div>
  );
}

export default AidStations;
