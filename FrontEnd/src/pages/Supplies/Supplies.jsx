import { useState } from "react";
import { Link } from "react-router-dom";

function Supplies() {
  const [supplies, setSupplies] = useState([
    { supplyID: 1, name: "Water Bottles", category: "drink" },
    { supplyID: 2, name: "Energy Bars", category: "food" },
    { supplyID: 3, name: "First Aid Kits", category: "medical" }
  ]);

  const handleDelete = (id) => {
    setSupplies((prev) => prev.filter((s) => s.supplyID !== id));
  };

  return (
    <div>
      <h2>Supplies</h2>

      

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {supplies.map((s) => (
            <tr key={s.supplyID}>
              <td>{s.name}</td>
              <td>{s.category}</td>
              <td>
                <Link className="link" to={`/Supplies/Edit/${s.supplyID}`}>Edit</Link>
              </td>
              <td>
                <button onClick={() => handleDelete(s.supplyID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className="link" to="/Supplies/Create">
        Create Supply Item
      </Link>
    </div>
  );
}

export default Supplies;
