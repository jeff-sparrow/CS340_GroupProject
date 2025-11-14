import { useState } from "react";
import { Link } from "react-router-dom";

function Volunteers() {
  const [volunteers, setVolunteers] = useState([
    { volunteerID: 1, firstName: "Alice", lastName: "Smith", email: "alice@example.com", phone: "555-1234", role: "Coordinator" },
    { volunteerID: 2, firstName: "Bob", lastName: "Johnson", email: "bob@example.com", phone: "555-5678", role: "Helper" },
    { volunteerID: 3, firstName: "Charlie", lastName: "Brown", email: "charlie@example.com", phone: "555-9012", role: "Medic" }
  ]);

  const handleDelete = (id) => {
    setVolunteers((prev) => prev.filter((v) => v.volunteerID !== id));
  };

  return (
    <div>
      <h2>Volunteers</h2>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((v) => (
            <tr key={v.volunteerID}>
              <td>{v.firstName}</td>
              <td>{v.lastName}</td>
              <td>{v.email}</td>
              <td>{v.phone}</td>
              <td>{v.role}</td>
              <td>
                <Link className="link" to={`/Volunteers/Edit/${v.volunteerID}`}>Edit</Link>
              </td>
              <td>
                <button onClick={() => handleDelete(v.volunteerID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className="link" to="/Volunteers/Create">
        Create Volunteer
      </Link>
    </div>
  );
}

export default Volunteers;
