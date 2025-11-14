import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EditRace = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    date: "",
    distance: 0,
    type: ""
  });

  // Simulated API fetch
  useEffect(() => {
    async function fetchRace() {

      const dummyRace = {
        name: "New Caprica Run",
        date: "2025-03-12",
        distance: 10,
        type: "Road"
      };

      setForm(dummyRace);
    }

    fetchRace();
  }, [id]);

  // Generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    console.log("Saving updated race:", form);
    // API update call will go here
  };

  return (
    <div>
      <h2>Edit Race: {form.name}</h2>
      <form className="form">
        <div>
          <label>Name:</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            type="date"
          />
        </div>
        <div>
          <label>Distance:</label>
          <input
            name="distance"
            value={form.distance}
            onChange={handleChange}
            type="number"
          />
        </div>
        <div>
          <label>Type:</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="">-- Select Type --</option>
            <option value="Road">Road</option>
            <option value="Trail">Trail</option>
          </select>
        </div>

        <button type="button" onClick={handleEdit}>
          Save Changes
        </button>
        <Link to="/Races">
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default EditRace;