import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateSupplies = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    console.log("Creating new supply:", form);
    // Replace with real API POST request
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/Supplies");
  };

  return (
    <div>
      <h2>Create New Supply</h2>

      <form className="supply-form">
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
          <label>Category:</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">-- Select Category --</option>
            <option value="food">Food</option>
            <option value="drink">Drink</option>
            <option value="medical">Medical</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="button" onClick={handleSave}>
          Save Supply
        </button>

        <Link to="/Supplies">
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default CreateSupplies;
