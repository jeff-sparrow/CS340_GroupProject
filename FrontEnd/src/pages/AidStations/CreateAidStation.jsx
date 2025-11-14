import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateAidStation = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mileMarker: 0,
    elevation: 0,
    latitude: 0,
    longitude: 0,
    raceID: 0,
  });

  const [races, setRaces] = useState([]);

  // Load races for dropdown
  useEffect(() => {
    async function fetchRaces() {
      // Replace with real API call
      const dummyRaces = [
        { raceID: 1, name: "New Caprica Run" },
        { raceID: 2, name: "Colonial Sprint" }
      ];
      setRaces(dummyRaces);
    }

    fetchRaces();
  }, []);

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

  const handleSave = async () => {
    console.log("Creating new aid station:", form);
    // Replace with real POST API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/AidStations");
  };

  return (
    <div>
      <h2>Create New Aid Station</h2>

      <form className="form">
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </div>

        <div>
          <label>Mile Marker:</label>
          <input type="number" name="mileMarker" value={form.mileMarker} onChange={handleChange} />
        </div>

        <div>
          <label>Elevation:</label>
          <input type="number" name="elevation" value={form.elevation} onChange={handleChange} />
        </div>

        <div>
          <label>Latitude:</label>
          <input type="number" name="latitude" value={form.latitude} onChange={handleChange} />
        </div>

        <div>
          <label>Longitude:</label>
          <input type="number" name="longitude" value={form.longitude} onChange={handleChange} />
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
          Save Aid Station
        </button>

        <Link to="/AidStations">
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default CreateAidStation;
