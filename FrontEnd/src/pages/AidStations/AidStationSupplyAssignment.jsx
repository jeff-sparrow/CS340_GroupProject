import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const AidStationSupplyAssignment = () => {
  const { stationID } = useParams(); // optional if assigning to a specific station
  const navigate = useNavigate();

  const [form, setForm] = useState({
    stationID: stationID || "",
    supplyID: "",
    quantity: 0
  });

  const [stations, setStations] = useState([]);
  const [supplies, setSupplies] = useState([]);

  // Load dummy data
  useEffect(() => {
    async function fetchData() {
      // Replace with API calls
      setStations([
        { stationID: 1, name: "Water Stop" },
        { stationID: 2, name: "Medical Tent" },
        { stationID: 3, name: "Finish Line Snacks" }
      ]);

      setSupplies([
        { supplyID: 1, name: "Water Bottles" },
        { supplyID: 2, name: "Energy Bars" },
        { supplyID: 3, name: "First Aid Kits" }
      ]);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value
    }));
  };

  const handleSave = async () => {
    console.log("Creating new supply assignment:", form);
    // Replace with real API POST request
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate(`/AidStations/${form.stationID}`);
  };

  return (
    <div>
      <h2>Assign Supply to Aid Station</h2>

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
          <label>Supply:</label>
          <select
            name="supplyID"
            value={form.supplyID}
            onChange={handleChange}
          >
            <option value="">-- Select Supply --</option>
            {supplies.map((s) => (
              <option key={s.supplyID} value={s.supplyID}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            min="0"
          />
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

export default AidStationSupplyAssignment;
