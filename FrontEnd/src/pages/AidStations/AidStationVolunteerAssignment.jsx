import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const AidStationVolunteerAssignment = () => {
  const { stationID } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    stationID: stationID || "",
    volunteerID: ""
  });

  const [stations, setStations] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  // Load dummy data
  useEffect(() => {
    async function fetchData() {
      // Replace with API calls
      setStations([
        { stationID: 1, name: "Water Stop" },
        { stationID: 2, name: "Medical Tent" },
        { stationID: 3, name: "Finish Line Snacks" }
      ]);

      setVolunteers([
        { volunteerID: 1, name: "Alice" },
        { volunteerID: 2, name: "Bob" },
        { volunteerID: 3, name: "Charlie" }
      ]);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    console.log("Creating new volunteer assignment:", form);
    // Replace with real API POST request
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate(`/AidStations/${form.stationID}`);
  };

  return (
    <div>
      <h2>Assign Volunteer to Aid Station</h2>

      <form className="assignment-form">
        <div>
          <label>Aid Station:</label>
          <select
            name="stationID"
            value={form.stationID}
            onChange={handleChange}
          >
            <option value="">-- Select Station --</option>
            {stations.map((s) => (
              <option key={s.stationID} value={s.stationID}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Volunteer:</label>
          <select
            name="volunteerID"
            value={form.volunteerID}
            onChange={handleChange}
          >
            <option value="">-- Select Volunteer --</option>
            {volunteers.map((v) => (
              <option key={v.volunteerID} value={v.volunteerID}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        <button type="button" onClick={handleSave}>
          Save Assignment
        </button>

        <Link to={`/AidStations/${form.stationID || ""}`}>
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default AidStationVolunteerAssignment;