import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function AidStationDetailView() {
  const { stationID } = useParams();

  const [station, setStation] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [supplies, setSupplies] = useState([]);

  // Dummy API fetch
  useEffect(() => {
    async function fetchData() {
      // Replace with real API calls

      // Aid Station info
      setStation({
        stationID: 0,
        raceID: 0,
        name: "Water Stop",
        mileMarker: 2,
        elevation: 50,
        latitude: 40.712776,
        longitude: -74.005974
      });

      // Volunteers assigned
      setVolunteers([
        { stationVolunteerID: 1, volunteerID: 1, fname: "Alice", lname: "Carter" },
        { stationVolunteerID: 2, volunteerID: 3, fname: "Bob", lname: "Johnson" }
      ]);

      // Supplies assigned
      setSupplies([
        { stationSupplyID: 1, supplyID: 3, name: "Water Bottles", quantity: 100 },
        { stationSupplyID: 2, supplyID: 2, name: "Energy Bars", quantity: 12 }
      ]);
    }

    fetchData();
  }, [stationID]);

  if (!station) return <p>Loading aid station details...</p>;

  return (
    <div>
      <h2>Aid Station Details</h2>

      <p><strong>Name:</strong> {station.name}</p>
      <p><strong>Mile Marker:</strong> {station.mileMarker}</p>
      <p><strong>Elevation:</strong> {station.elevation}</p>
      <p><strong>Latitude:</strong> {station.latitude}</p>
      <p><strong>Longitude:</strong> {station.longitude}</p>
      <Link className='link' to="/AidStations">
        Back to Aid Stations
      </Link>

      <h2>Assigned Volunteers</h2>
      <table className="volunteer-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map(v => (
            <tr key={v.stationVolunteerID}>
              <td>{v.fname} </td>
              <td>{v.lname} </td>
              <td>
                <button /* onClick={() => handleDeleteVolunteer(v.stationVolunteerID)} */>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className='link' to={`/AidStations/${stationID}/AddVolunteer`}>
        Create Volunteer Assignment
      </Link>

      <h2>Assigned Supplies</h2>
      <table className="supply-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {supplies.map(s => (
            <tr key={s.stationSupplyID}>
              <td>{s.name}</td>
              <td>{s.quantity}</td>
              <td>
                <button /* onClick={() => handleDeleteSupply(s.stationSupplyID)} */>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className='link' to={`/AidStations/${stationID}/AddSupply`}>
        Create Supply Assignment
      </Link>

      
    </div>
  );
}

export default AidStationDetailView;