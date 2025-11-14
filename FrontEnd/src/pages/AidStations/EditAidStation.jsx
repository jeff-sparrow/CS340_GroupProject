import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const EditAidStation = () => {
  const { stationID } = useParams();
  const navigate = useNavigate();
  const [races, setRaces] = useState([]);

  const [form, setForm] = useState({
    raceID: 0,
    name: "",
    mileMarker: 0,
    elevation: 0,
    latitude: 0,
    longitude: 0
  });

  
  // Dummy API fetch
  useEffect(() => {
    async function fetchStation() {
      // Replace with real API call
      const dummyStation = {
        name: "Water Stop",
        mileMarker: 2,
        elevation: 50,
        latitude: 40.712776,
        longitude: -74.005974,
        raceID: 1
      };
      setForm(dummyStation);
      // Simulate fetching race options
      const dummyRaces = [
        { raceID: 1, name: "New Caprica Run" },
        { raceID: 2, name: "Colonial Sprint" }
      ];
      setRaces(dummyRaces);
    }

    fetchStation();
    
  }, [stationID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const processedValue = ["mileMarker", "elevation", "latitude", "longitude"].includes(name)
      ? Number(value)
      : value;
    setForm((prev) => ({
      ...prev,
      [name]: processedValue
    }));
    
  };

  const handleSave = () => {
    console.log("Saving station:", form);
    // Replace with API update call
    navigate("/AidStations");
  };

  return (
    <div>
      <h2>Edit Aid Station #{stationID}</h2>

      <form className="form">
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={form.name} 
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mile Marker:</label>
          <input 
            type="number" 
            name="mileMarker" 
            value={form.mileMarker} 
            onChange={handleChange} 
          />
        </div>

        <div>
          <label>Elevation:</label>
          <input 
            type="number" 
            name="elevation" 
            value={form.elevation} 
            onChange={handleChange} 
          />
        </div>

        <div>
          <label>Latitude:</label>
          <input type="number" 
          name="latitude" 
          value={form.latitude}
          onChange={handleChange} 
          />
        </div>

        <div>
          <label>Longitude:</label>
          <input type="number" 
          name="longitude" 
          value={form.longitude} 
          onChange={handleChange} 
          />
        </div>

        <div>
          <label>Race:</label>
          <select name="raceID" value={form.raceID} onChange={handleChange}>
            <option value="">-- Select Race --</option>
            {races.map((race) => (
              <option key={race.raceID} value={race.raceID}>
                {race.name}
              </option>
            ))}
          </select>
        </div>

        <button type="button" onClick={handleSave}>
          Save Changes
        </button>

        <Link to="/AidStations">
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default EditAidStation;
