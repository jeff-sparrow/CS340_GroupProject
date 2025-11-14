import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditVolunteer = () => {
  const { volunteerID } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: ""
  });

  // Load volunteer data (replace with real API call)
  useEffect(() => {
    async function fetchVolunteer() {
      // Dummy data
      const volunteer = {
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@example.com",
        phone: "555-1234",
        role: "Coordinator"
      };
      setForm(volunteer);
    }

    fetchVolunteer();
  }, [volunteerID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    console.log(`Saving volunteer ${volunteerID}:`, form);
    // Replace with real API PUT request
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/Volunteers");
  };

  return (
    <div>
      <h2>Edit Volunteer</h2>

      <form className="volunteer-form">
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
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="">-- Select Role --</option>
            <option value="Coordinator">Coordinator</option>
            <option value="Helper">Helper</option>
            <option value="Medic">Medic</option>
          </select>
        </div>

        <button type="button" onClick={handleSave}>
          Save Changes
        </button>

        <Link className="link" to="/Volunteers">
           Cancel
        </Link>
      </form>
    </div>
  );
};

export default EditVolunteer;
