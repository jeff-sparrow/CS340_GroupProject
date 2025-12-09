// Citation:
// Date: 12/08/2025
// Adapted from: Iterative copilot queries describing desired functionality
// Source URL: https://m365.cloud.microsoft/

import React, { useState, useEffect } from 'react';

const CreateASSupplyForm = ({ backendURL, refreshASS }) => {
  const [stations, setStations] = useState([]); 
  const [supplies, setSupplies] = useState([]); 

  const [formData, setFormData] = useState({
    stationID: '',         
    supplyID: '',          
    quantity: '',          
  });

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const [stationRes, supplyRes] = await Promise.all([
          fetch(`${backendURL}/aid-stations`),
          fetch(`${backendURL}/supplies`)
        ]);

        const [staData, supData] = await Promise.all([
          stationRes.json(),
          supplyRes.json()
        ]);

        setStations(
          Array.isArray(staData)
            ? staData.map(s => ({
                stationID: s.stationID,
                stationName: s.stationName ?? s.name ?? `Station ${s.stationID}`
              }))
            : []
        );

        setSupplies(
          Array.isArray(supData)
            ? supData.map(s => ({
                supplyID: s.supplyID,
                supplyName: s.name ?? s.supplyName ?? `Supply ${s.supplyID}`,
                category: s.category ?? ''
              }))
            : []
        );
      } catch (err) {
        console.error('Error loading dropdown lists:', err);
      }
    };
    fetchLists();
  }, [backendURL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For quantity, keep as string and coerce on submit
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Coerce to integers for IDs/quantity
    const payload = {
      stationID: formData.stationID ? parseInt(formData.stationID, 10) : null,
      supplyID: formData.supplyID ? parseInt(formData.supplyID, 10) : null,
      quantity: formData.quantity ? parseInt(formData.quantity, 10) : null,
    };

    if (!payload.stationID || !payload.supplyID || !payload.quantity || payload.quantity <= 0) {
      alert('Please select a station, a supply, and enter a positive quantity.');
      return;
    }

    try {
      const res = await fetch(`${backendURL}/aid-station-supplies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        console.log('Aid Station Supply created successfully.');
        refreshASS?.();
        setFormData({ stationID: '', supplyID: '', quantity: '' });
      } else {
        const msg = await res.text();
        console.error('Error creating Aid Station Supply:', msg);
        alert(msg || 'Error creating Aid Station Supply.');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('Network or server error while creating Aid Station Supply.');
    }
  };

  return (
    <>
      <h2>Create Aid Station Supply</h2>
      <form className="cuForm" onSubmit={handleSubmit}>
        <label htmlFor="stationID">Aid Station: </label>
        <select
          name="stationID"
          id="stationID"
          value={formData.stationID}
          onChange={handleChange}
          required
        >
          <option value="">Select a station</option>
          {stations.map(s => (
            <option key={s.stationID} value={s.stationID}>
              {s.stationName}
            </option>
          ))}
        </select>

        <label htmlFor="supplyID">Supply: </label>
        <select
          name="supplyID"
          id="supplyID"
          value={formData.supplyID}
          onChange={handleChange}
          required
        >
          <option value="">Select a supply</option>
          {supplies.map(s => (
            <option key={s.supplyID} value={s.supplyID}>
              {s.supplyName}{s.category ? ` (${s.category})` : ''}
            </option>
          ))}
        </select>

        <label htmlFor="quantity">Quantity: </label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          step="1"
          inputMode="numeric"
          required
        />

        <input type="submit" value="Create" />
      </form>
    </>
  );
};

export default CreateASSupplyForm;
