import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateVolunteer = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    console.log("Creating volunteer:", form);
    // Replace with API POST call
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/Volunteers");
  };

  return (
    <div>
      <h2>Create New Volunteer</h2>

      <form className="form">
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} />
        </div>

        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </div>

        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div>
          <label>Role:</label>
          <input type="text" name="role" value={form.role} onChange={handleChange} />
        </div>

        <button type="button" onClick={handleSave}>
          Save Volunteer
        </button>

        <Link className="link" to="/Volunteers">
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default CreateVolunteer;
