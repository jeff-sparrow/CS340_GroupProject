// Citation:
// Date: 12/08/2025
// Adapted from: Iterative copilot queries describing desired functionality
// Source URL: https://m365.cloud.microsoft/

import React, { useState, useEffect } from 'react';

const UpdateASSupplyForm = ({ backendURL, refreshASS }) => {
  const [stations, setStations] = useState([]); 
  const [stationSupplies, setStationSupplies] = useState([]); 
  const [form, setForm] = useState({
    stationID: '',
    stationSupplyID: '',
    quantity: '',
  });

  // Load stations once
  useEffect(() => {
    const loadStations = async () => {
      try {
        const res = await fetch(`${backendURL}/aid-stations`);
        const data = await res.json();
        // Expecting: stationID, stationName, raceName ...
        setStations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error loading stations:', err);
      }
    };
    loadStations();
  }, [backendURL]);

  // When a station is selected, load its supplies
  useEffect(() => {
    if (!form.stationID) {
      setStationSupplies([]);
      setForm(prev => ({ ...prev, stationSupplyID: '', quantity: '' }));
      return;
    }
    const loadSupplies = async () => {
      try {
        const res = await fetch(`${backendURL}/aid-station-supplies?stationID=${form.stationID}`);
        const data = await res.json();
        // Expecting: stationSupplyID, supplyName, category, quantity ...
        setStationSupplies(Array.isArray(data) ? data : []);
        // Reset selection when station changes
        setForm(prev => ({ ...prev, stationSupplyID: '', quantity: '' }));
      } catch (err) {
        console.error('Error loading station supplies:', err);
      }
    };
    loadSupplies();
  }, [backendURL, form.stationID]);

  // When a supply (intersection row) is selected, prefill its quantity
  useEffect(() => {
    if (!form.stationSupplyID) return;
    const row = stationSupplies.find(r => String(r.stationSupplyID) === String(form.stationSupplyID));
    if (row) {
      setForm(prev => ({ ...prev, quantity: String(row.quantity ?? '') }));
    }
  }, [form.stationSupplyID, stationSupplies]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.stationSupplyID || !form.quantity) return;

    try {
      const res = await fetch(`${backendURL}/aid-station-supplies/${form.stationSupplyID}`, {
        method: 'PUT', // minimal ID-based update
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: parseInt(form.quantity, 10) }),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => '');
        console.error('Error updating Aid Station Supply:', msg);
        alert(msg || 'Error updating Aid Station Supply.');
        return;
      }

      console.log('Aid Station Supply updated successfully.');
      refreshASS?.(); // refresh table/list
      // Optionally keep selections; otherwise reset:
      // setForm({ stationID: '', stationSupplyID: '', quantity: '' });
    } catch (err) {
      console.error('Error during update:', err);
      alert('Network/server error while updating Aid Station Supply.');
    }
  };

  return (
    <>
      <h2>Update Aid Station Supply</h2>
      <form className="cuForm" onSubmit={handleSubmit}>
        {/* Station */}
        <label htmlFor="stationID">Aid Station: </label>
        <select
          name="stationID"
          id="stationID"
          value={form.stationID}
          onChange={handleChange}
          required
        >
          <option value="">Select a station</option>
          {stations.map(s => (
            <option key={s.stationID} value={s.stationID}>
              {s.stationName ?? s.name} {s.raceName ? `(${s.raceName})` : ''}
            </option>
          ))}
        </select>

        {/* Supply at that station (intersection row selection) */}
        <label htmlFor="stationSupplyID">Supply: </label>
        <select
          name="stationSupplyID"
          id="stationSupplyID"
          value={form.stationSupplyID}
          onChange={handleChange}
          required
          disabled={!form.stationID}
        >
          <option value="">Select a supply</option>
          {stationSupplies.map(r => (
            <option key={r.stationSupplyID} value={r.stationSupplyID}>
              {r.supplyName} {r.category ? `(${r.category})` : ''}
            </option>
          ))}
        </select>

        {/* Quantity */}
        <label htmlFor="quantity">Quantity: </label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={form.quantity}
          onChange={handleChange}
          min="1"
          step="1"
          inputMode="numeric"
          required
          disabled={!form.stationSupplyID}
        />

        <input type="submit" value="Update" />
      </form>
    </>
  );
};

export default UpdateASSupplyForm;
