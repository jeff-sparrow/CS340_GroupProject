import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RaceDetailView = () => {
  const { id } = useParams();

  const [race, setRace] = useState(null);
  const [aidStations, setAidStations] = useState([]);

  // Dummy API calls
  async function fetchRace(id) {
    // Replace with real API later
    return {
      raceID: 1,
      name: "Over The Hills",
      date: "2024-12-12",
      distance: 12,
      type: "Trail"
    };
  }

  async function fetchAidStations(id) {
    // Replace with real API later
    return [
      { stationID: 1, name: "The Hub", mile: 2 },
      { stationID: 2, name: "Free Candy", mile: 5 },
      { stationID: 3, name: "Gatorade Pool", mile: 10 }
    ];
  }

  // Load data
  useEffect(() => {
    async function loadData() {
      const raceData = await fetchRace(id);
      const stationData = await fetchAidStations(id);

      setRace(raceData);
      setAidStations(stationData);
    }

    loadData();
  }, [id]);

  if (!race) {
    return <p>Loading race details...</p>;
  }

  return (
    <div>
      <h2>Race Details</h2>

      <p><strong>Name:</strong> {race.name}</p>
      <p><strong>Date:</strong> {race.date}</p>
      <p><strong>Distance:</strong> {race.distance} km</p>
      <p><strong>Type:</strong> {race.type}</p>

      <h3>Aid Stations for {race.name}</h3>

      <table className="aid-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mile</th>
          </tr>
        </thead>
        <tbody>
          {aidStations.map((station) => (
            <tr key={station.stationID}>
              <td><Link className='link' to={`/AidStations/${station.id}`}>{station.name}</Link></td>
              <td>{station.mile}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/Races">
        <button>Back to Races</button>
      </Link>
    </div>
  );
};

export default RaceDetailView;
