import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditSupplies = () => {
  const { supplyID } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: ""
  });

  // Load supply data (replace with real API call)
  useEffect(() => {
    async function fetchSupply() {
      // Dummy data
      const supply = {
        name: "Water Bottles",
        category: "drink"
      };
      setForm(supply);
    }

    fetchSupply();
  }, [supplyID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    console.log(`Saving supply ${supplyID}:`, form);
    // Replace with real API PUT request
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/Supplies");
  };

  return (
    <div>
      <h2>Edit Supply Item</h2>

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
          Save Changes
        </button>

        <Link to="/Supplies">
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default EditSupplies;
