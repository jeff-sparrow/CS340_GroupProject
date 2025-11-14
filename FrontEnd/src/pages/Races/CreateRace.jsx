import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateRace = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    date: "",
    distance: 0,
    type: ""
  });

  // Generic form change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Simulated API call
  const handleSave = async () => {
    console.log("Creating new race:", form);

    // Replace this later with real POST API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Redirect back to race list after save
    navigate("/Races");
  };

  return (
    <div>
      <h2>Create New Race</h2>

      <form className="form">
        <div>
          <label>Name:</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Date:</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Distance:</label>
          <input
            name="distance"
            type="number"
            value={form.distance}
            onChange={handleChange}
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

        <button type="button" onClick={handleSave}>
          Save Race
        </button>

        <Link to="/Races">
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default CreateRace;